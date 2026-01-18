// Fix existing invoices that don't have customerId linked
// This script will:
// 1. Find invoices without customerId but with customerSnapshot.name
// 2. Try to find matching OfflineCustomer by name and phone
// 3. Link the invoice to the customer and update stats

const mongoose = require('mongoose');
const OfflineInvoice = require('./api/models/OfflineInvoiceModel');
const OfflineCustomer = require('./api/models/OfflineCustomerModel');
require('dotenv').config();

const fixInvoiceCustomerLinks = async () => {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✓ Connected to MongoDB successfully!\n');

        console.log('Starting to fix invoice-customer links...');

        // Find all invoices without customerId
        const invoices = await OfflineInvoice.find({
            $or: [
                { customerId: { $exists: false } },
                { customerId: null }
            ],
            status: 'active'
        });

        console.log(`Found ${invoices.length} invoices without customer links\n`);

        let fixed = 0;
        let notFound = 0;

        for (const invoice of invoices) {
            if (!invoice.customerSnapshot?.name) {
                console.log(`Invoice ${invoice.invoiceNumber} has no customer name`);
                continue;
            }

            // Try to find customer by name and phone
            const query = { name: invoice.customerSnapshot.name };

            if (invoice.customerSnapshot.phone) {
                query.phone = invoice.customerSnapshot.phone;
            }

            const customer = await OfflineCustomer.findOne(query);

            if (customer) {
                // Link invoice to customer
                invoice.customerId = customer._id;
                await invoice.save();

                // Update customer stats
                await customer.recordPurchase(invoice.total);

                console.log(`✓ Fixed invoice ${invoice.invoiceNumber} - linked to ${customer.name} (₹${invoice.total})`);
                fixed++;
            } else {
                console.log(`✗ No customer found for invoice ${invoice.invoiceNumber} (${invoice.customerSnapshot.name})`);
                notFound++;
            }
        }

        console.log('\n=========================');
        console.log('=== Fix Summary ===');
        console.log('=========================');
        console.log(`Total invoices processed: ${invoices.length}`);
        console.log(`✓ Fixed: ${fixed}`);
        console.log(`✗ Customer not found: ${notFound}`);
        console.log('=========================\n');

    } catch (error) {
        console.error('❌ Error fixing invoice links:', error);
    } finally {
        // Close MongoDB connection
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed');
        }
        process.exit(0);
    }
};

// Run the function
fixInvoiceCustomerLinks();
