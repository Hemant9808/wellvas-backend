
export  const emailTemp=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Acknowledgement</title>
</head>
<body style="margin:0; padding:0; background:#f8f9fa; font-family:Arial,sans-serif;">
    <!-- Main Container -->
    <div style="max-width:600px; margin:20px auto; background:#fff; border:1px solid #ddd; border-radius:5px;">
        <!-- Header Section -->
        <div style="background:#f0f5ff; padding:20px; border-bottom:1px solid #ddd;">
            <p style="margin:0 0 15px 0; font-size:14px; color:#555; text-align:center;">
                For any changes with your flight, date, route or names<br>
                Call us at <strong>1-646-736-4922</strong> or 
                <a href="#" style="color:#007bff; text-decoration:none;">Click here to reach help center</a>
            </p>
            <div style="text-align:center;">
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Print Ticket</a>
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Download Ticket</a>
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Share Ticket</a>
            </div>
        </div>

        <!-- Booking Acknowledgement -->
        <div style="padding:20px;">
            <h2 style="color:#e56232; font-size:18px; margin:0 0 15px 0;">Booking Acknowledgement</h2>
            <table width="100%" style="margin-bottom:15px;">
                <tr>
                    <td style="vertical-align:top;">
                        <p style="margin:5px 0; font-size:14px;"><strong>Qatar Booking:</strong> 85533720</p>
                        <p style="margin:5px 0; font-size:14px;"><strong>Email:</strong> Demo@gmail.com</p>
                        <p style="margin:5px 0; font-size:14px;"><strong>Booking on:</strong> Tue, June 11, 2024</p>
                    </td>
                    <td style="text-align:center; width:120px;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" alt="QR Code" style="height:80px;">
                        <p style="margin:5px 0; font-size:14px;">A1GEZX</p>
                    </td>
                </tr>
            </table>

            <!-- Note -->
            <div style="background:#f1f9ff; border-left:4px solid #007bff; padding:10px 15px; margin-bottom:20px;">
                <p style="margin:0; font-size:14px; color:#555;">Please check your terminal and gate information with the airline directly at least 24 hours before departure.</p>
            </div>

            <!-- Steps -->
            <table width="100%" cellpadding="10" style="background:#f9f9f9; border-top:1px solid #ddd;">
                <tr>
                    <td width="25%" style="text-align:center; background:#dcecfb; border-radius:8px; padding:15px;">
                        <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png" alt="Check-in" style="height:40px;">
                        <h4 style="margin:10px 0; font-size:14px;">Check in online, or</h4>
                        <p style="margin:0; font-size:12px; color:#777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                    </td>
                    <!-- Repeat similar structure for other steps -->
                </tr>
            </table>
        </div>

        <!-- Flight Details -->
        <div style="padding:20px; border-top:1px solid #ddd;">
            <h2 style="color:#333; font-size:18px; margin:0 0 15px 0;">Flight Details</h2>
            <div style="background:#eaf0f0; padding:15px; border-radius:5px;">
                <h3 style="color:#ff6600; font-size:16px; margin:0 0 10px 0;">Departing Flight</h3>
                <p style="font-size:14px; color:#666; margin:0 0 15px 0;">Note: The following flight has different class of service</p>
                
                <!-- Flight Entry -->
                <div style="display:table; width:100%; margin-bottom:20px;">
                    <div style="display:table-cell; width:30%; vertical-align:top;">
                        <p style="margin:0; font-size:14px;">Sun, 29 Jan 2023</p>
                        <p style="font-size:22px; margin:5px 0;">14.50</p>
                        <p style="margin:0; font-size:14px;">Moi Intl, Mombasa Kenya</p>
                    </div>
                    <div style="display:table-cell; width:40%; text-align:center; vertical-align:middle;">
                        <span style="display:inline-block; width:8px; height:8px; background:#333; border-radius:50%;"></span>
                        <span style="font-size:14px; margin:0 10px;">9hr 50min</span>
                        <span style="display:inline-block; width:8px; height:8px; background:#333; border-radius:50%;"></span>
                    </div>
                    <div style="display:table-cell; width:30%; vertical-align:top; text-align:right;">
                        <p style="margin:0; font-size:14px;">Sun, 30 Jan 2023</p>
                        <p style="font-size:22px; margin:5px 0;">02.50</p>
                        <p style="margin:0; font-size:14px;">JFK Terminal, Nairobi, Kenya</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Traveler Information -->
        <div style="padding:20px; border-top:1px solid #ddd;">
            <h2 style="font-size:18px; margin:0 0 15px 0;">Traveler Information</h2>
            <table width="100%" style="border-collapse:collapse; margin-bottom:15px;">
                <tr style="background:#f9f9f9;">
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">E-Ticket Number</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">PNR Number</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">Status</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">First name</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">Last name</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">Request</th>
                    <th style="padding:10px; border:1px solid #ddd; font-size:14px;">Gender</th>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">A1GEZX</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">Pending</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; color:red; font-size:14px;">Pending</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">Animesh</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">Sadh</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">Sadh</td>
                    <td style="padding:10px; border:1px solid #ddd; text-align:center; font-size:14px;">Male</td>
                </tr>
            </table>

            <!-- Billing Details -->
            <h2 style="font-size:18px; margin:20px 0 15px 0;">Billing Details</h2>
            <table width="100%" style="margin-bottom:20px;">
                <tr>
                    <td style="padding:8px; font-size:14px;">1 Adult Ticket</td>
                    <td style="padding:8px; text-align:right; font-size:14px;">$281.00</td>
                </tr>
                <tr>
                    <td style="padding:8px; font-size:14px;">Subtotal</td>
                    <td style="padding:8px; text-align:right; font-size:14px;">$281.00</td>
                </tr>
                <tr>
                    <td style="padding:8px; font-weight:bold; color:#007bff; font-size:14px;">Flight Total</td>
                    <td style="padding:8px; text-align:right; font-weight:bold; color:#007bff; font-size:14px;">$281.00</td>
                </tr>
            </table>

            <!-- Please Note -->
            <div style="border-top:1px solid #ddd; padding-top:15px;">
                <h2 style="font-size:18px; margin:0 0 15px 0;">Please Note</h2>
                <p style="font-size:14px; color:#555; margin:0 0 10px 0;">
                    Fares are not guaranteed until ticketed. Taxes, fees, and baggage charges
                    are subject to change and may be additional.
                </p>
                <p style="font-size:14px; color:#555; margin:0;">
                    <a href="#" style="color:#007bff; text-decoration:none;">Privacy Policy</a> | 
                    <a href="#" style="color:#007bff; text-decoration:none;">Contact Us</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>`

export const temp2=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Acknowledgement</title>
</head>
<body style="margin:0; padding:0; background:#f8f9fa; font-family:Arial,sans-serif;">
    <!-- Main Container -->
    <div style="max-width:600px; margin:20px auto; background:#fff; border:1px solid #ddd; border-radius:5px;">
        <!-- Header Section -->
        <div style="background:#f0f5ff; padding:20px; text-align:center; border-bottom:1px solid #ddd;">
            <p style="margin:0 0 15px 0; font-size:14px; color:#555;">
                For any changes with your flight, date, route or names<br>
                Call us at <strong>1-646-736-4922</strong> or 
                <a href="#" style="color:#007bff; text-decoration:none;">Click here to reach help center</a>
            </p>
            <div>
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Print Ticket</a>
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Download Ticket</a>
                <a href="#" style="display:inline-block; background:#007bff; color:#fff; text-decoration:none; padding:8px 15px; border-radius:5px; margin:0 5px; font-size:14px;">Share Ticket</a>
            </div>
        </div>

        <!-- Booking Acknowledgement -->
        <div style="padding:20px;">
            <h2 style="color:#e56232; font-size:18px; margin:0 0 15px 0;">Booking Acknowledgement</h2>
            <table width="100%" style="margin-bottom:15px;">
                <tr>
                    <td style="vertical-align:top;">
                        <p style="margin:5px 0; font-size:14px;"><strong>Qatar Booking:</strong> 85533720</p>
                        <p style="margin:5px 0; font-size:14px;"><strong>Email:</strong> Demo@gmail.com</p>
                        <p style="margin:5px 0; font-size:14px;"><strong>Booking on:</strong> Tue, June 11, 2024</p>
                    </td>
                    <td style="text-align:center; width:120px;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" alt="QR Code" style="height:80px;">
                        <p style="margin:5px 0; font-size:14px;">A1GEZX</p>
                    </td>
                </tr>
            </table>

            <div style="background:#f1f9ff; border-left:4px solid #007bff; padding:10px 15px; margin-bottom:20px;">
                <p style="margin:0; font-size:14px; color:#555;">Please check your terminal and gate information with the airline directly at least 24 hours before departure.</p>
            </div>

            <!-- Steps Section -->
            <div style="border-top:1px solid #ddd; padding-top:15px;">
                <h3 style="font-size:16px; margin:0 0 15px 0;">Check in online, or</h3>
                <div style="margin-left:20px;">
                    <div style="margin-bottom:15px;">
                        <h4 style="font-size:14px; margin:0 0 5px 0;">90 minutes</h4>
                        <p style="margin:0; font-size:14px; color:#666;">90 minutes before take-off go through passport control</p>
                    </div>
                    <div style="margin-bottom:15px;">
                        <h4 style="font-size:14px; margin:0 0 5px 0;">60 minutes</h4>
                        <p style="margin:0; font-size:14px; color:#666;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class)</p>
                    </div>
                    <div>
                        <h4 style="font-size:14px; margin:0 0 5px 0;">45 minutes</h4>
                        <p style="margin:0; font-size:14px; color:#666;">45 minutes before take-off be ready at the gate (First Class, Business Class)</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flight Details -->
        <div style="padding:20px; border-top:1px solid #ddd;">
            <h2 style="color:#333; font-size:18px; margin:0 0 15px 0;">Flight Details</h2>
            <div style="background:#fff; padding:15px; border-radius:5px;">
                <h3 style="color:#ff6600; font-size:16px; margin:0 0 10px 0;">Departing Flight</h3>
                <p style="font-size:14px; color:#666; margin:0 0 15px 0;">Note: The following flight has different class of service</p>
                
                <!-- Flight Info -->
                <div style="margin-bottom:20px;">
                    <p style="margin:0 0 5px 0; font-size:14px;"><strong>ABC Airline</strong></p>
                    <p style="margin:0 0 5px 0; font-size:14px;">Flight 135 | Aircraft: 135</p>
                    <p style="margin:0 0 15px 0; font-size:14px;">Boeing 735 115-138 STD SEAT</p>
                    
                    <div style="border-top:1px solid #eee; padding:15px 0;">
                        <p style="margin:0 0 10px 0; font-size:14px;"><strong>Sun, 29 Jan 2023</strong></p>
                        <p style="margin:0 0 5px 0; font-size:22px; color:#333;">14.50</p>
                        <p style="margin:0; font-size:14px;">Moi Intl, Mombasa Kenya</p>
                    </div>
                    
                    <div style="border-top:1px solid #eee; padding:15px 0;">
                        <p style="margin:0 0 10px 0; font-size:14px;"><strong>Sun, 30 Jan 2023</strong></p>
                        <p style="margin:0 0 5px 0; font-size:22px; color:#333;">02.50</p>
                        <p style="margin:0; font-size:14px;">JFK Terminal, Nairobi, Kenya</p>
                    </div>
                </div>

                <div style="background:#eaf0f0; padding:15px; border-radius:5px;">
                    <p style="margin:0 0 10px 0; font-size:14px;"><strong>Travel Class:</strong> Economy</p>
                    <p style="margin:0 0 10px 0; font-size:14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                    <p style="margin:0 0 10px 0; font-size:14px;"><strong>Terminal - 2, Gate - 25</strong></p>
                </div>
            </div>
        </div>

        <!-- Traveler Information -->
        <div style="padding:20px; border-top:1px solid #ddd;">
            <h2 style="font-size:18px; margin:0 0 15px 0;">Traveler Information</h2>
            <div style="overflow-x:auto;">
                <table style="width:100%; min-width:500px; border-collapse:collapse; margin-bottom:15px;">
                    <tr style="background:#f9f9f9;">
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">E-Ticket Number</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">PNR Number</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">Status</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">First name</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">Last name</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">Request</th>
                        <th style="padding:10px; border:1px solid #ddd; font-size:14px; text-align:left;">Gender</th>
                    </tr>
                    <tr>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">A1GEZX</td>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">Pending</td>
                        <td style="padding:10px; border:1px solid #ddd; color:red; font-size:14px;">Pending</td>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">Animesh</td>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">Sadh</td>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">Sadh</td>
                        <td style="padding:10px; border:1px solid #ddd; font-size:14px;">Male</td>
                    </tr>
                </table>
            </div>

            <!-- Billing Details -->
            <h2 style="font-size:18px; margin:20px 0 15px 0;">Billing Details</h2>
            <div style="margin-bottom:20px;">
                <div style="margin-bottom:10px;">
                    <span style="display:inline-block; width:70%; font-size:14px;">1 Adult Ticket</span>
                    <span style="display:inline-block; width:28%; text-align:right; font-size:14px;">$281.00</span>
                </div>
                <div style="margin-bottom:10px;">
                    <span style="display:inline-block; width:70%; font-size:14px;">Subtotal</span>
                    <span style="display:inline-block; width:28%; text-align:right; font-size:14px;">$281.00</span>
                </div>
                <div style="border-top:1px solid #ddd; padding-top:10px;">
                    <span style="display:inline-block; width:70%; font-weight:bold; color:#007bff; font-size:14px;">Flight Total</span>
                    <span style="display:inline-block; width:28%; text-align:right; font-weight:bold; color:#007bff; font-size:14px;">$281.00</span>
                </div>
            </div>

            <!-- Please Note -->
            <div style="border-top:1px solid #ddd; padding-top:15px;">
                <h2 style="font-size:18px; margin:0 0 15px 0;">Please Note</h2>
                <ul style="margin:0 0 15px 0; padding-left:20px;">
                    <li style="font-size:14px; margin-bottom:5px;">All fares are quoted in USD</li>
                    <li style="font-size:14px; margin-bottom:5px;">Your credit card may be billed in multiple charges</li>
                    <li style="font-size:14px;">Some airlines may charge Baggage Fees</li>
                </ul>
                <p style="font-size:14px; color:#555; margin:0;">
                    <a href="#" style="color:#007bff; text-decoration:none;">Privacy Policy</a> | 
                    <a href="#" style="color:#007bff; text-decoration:none;">Contact Us</a><br>
                    © 2006-2024 Vuettios, Inc. All right reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`

export const temp4 =`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flight Itinerary</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
    <div style="max-width: 600px; background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="color: #ff6600; font-size: 18px; font-weight: bold;">Departing Flight</div>
        <div style="display: flex; align-items: center; font-size: 20px; font-weight: bold; margin: 10px 0;">&#9992; ABC Airline</div>
        <div style="background-color: #eef4f7; padding: 15px; border-radius: 8px; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #ccc;">
                <div>
                    <div style="font-size: 22px; font-weight: bold;">14.50</div>
                    <div>Moi Intl, Mombasa Kenya</div>
                </div>
                <div>✈️ 9hr 50min</div>
                <div>
                    <div style="font-size: 22px; font-weight: bold;">02.50</div>
                    <div>JFK Terminal, Nairobi, Kenya</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #ccc;">
                <div>
                    <div style="font-size: 22px; font-weight: bold;">14.50</div>
                    <div>JFK Terminal, Nairobi, Kenya</div>
                </div>
                <div>✈️ 9hr 50min</div>
                <div>
                    <div style="font-size: 22px; font-weight: bold;">14.50</div>
                    <div>Moi Intl, Mombasa Kenya</div>
                </div>
            </div>
        </div>
        <div style="font-size: 16px; font-weight: bold;">Travel Class: Economy</div>
        <div style="font-size: 12px; color: #666; margin-top: 10px; text-align: center;">
            Check airline fare rules. Most airlines charge baggage fees. Check the baggage fees for complete details.
        </div>
    </div>
</body>
</html`


export const old=`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Booking Acknowledgement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            /* Limit width on larger screens */
            margin: 20px auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #f0f5ff;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .header img {
            height: 40px;
        }

        .header .help {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
            /* Space between help text and buttons */
        }

        .header .actions {
            display: flex;
            gap: 10px;
            /* Space between buttons */
        }

        .header .actions button {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }

        .content {
            padding: 20px;
        }

        .content h2 {
            font-size: 18px;
            color: #e56232;
            margin-bottom: 10px;
        }

        .details {
            display: flex;
            flex-wrap: wrap;
            /* Allow wrapping */
            justify-content: space-between;
            margin-bottom: 10px;
        }

        .details .info {
            font-size: 14px;
            color: #555;
            flex: 1;
            /* Allow flex-grow */
            min-width: 240px;
            /* Prevent it from getting too narrow */
        }

        .details .qr-code {
            text-align: center;
        }

        .details .qr-code img {
            height: 80px;
        }

        .note {
            background: #f1f9ff;
            border-left: 4px solid #007bff;
            padding: 10px 15px;
            font-size: 14px;
            color: #555;
            margin-bottom: 20px;
        }

        .terms {
            font-size: 14px;
            color: #777;
            margin-bottom: 20px;
        }

        .steps {
            display: flex;
            flex-direction: row;
            /* flex-wrap: wrap; Allow wrapping */
            justify-content: space-between;
            background: #f9f9f9;
            padding: 15px;
            border-top: 1px solid #ddd;
        }

        .step {
            text-align: center;
            flex: 1 1 23%;
            /* Flex-grow, flex-shrink, and basis */
            margin: 5px;
            /* Space between steps */
            font-size: 14px;
            padding: 1rem;
            border-radius: 1rem;
        }

        .step1 {
            background: linear-gradient(to left, #ffffff, #dcecfb);
        }

        .step2 {
            background: linear-gradient(to right, #c5bfae, #ffffff);
        }

        .step3 {
            background: linear-gradient(to right, #c5bfae, #ffffff);
        }

        .step4 {
            background: linear-gradient(to right, #c5bfae, #ffffff);
        }

        .step img {
            height: 40px;
            margin-bottom: 10px;
        }

        .step h4 {
            font-size: 14px;
            color: #333;
            margin-bottom: 5px;
        }

        .step p {
            font-size: 12px;
            color: #777;
        }

        /* Flight Details Section */
        .flight-details {
            font-family: Arial, sans-serif;
            margin-top: 30px;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .flight-details h2 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
        }

        .flight-section h3 {
            color: #ff6600;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .flight-info {
            border-top: 1px solid #eee;
            padding-top: 15px;
        }

        .flight-header {
            display: flex;
            flex-direction: column;
            /* Stack airline info vertically */
            margin-bottom: 20px;
        }

        .airline-info {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            /* Wrap items on smaller screens */
        }

        .airline-info img {
            margin-right: 10px;
            height: 60px;
        }

        .airline-info h4 {
            margin: 0;
            color: #333;
        }

        .airline-info p {
            font-size: 12px;
            color: #666;
        }

        .travel-class {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .travel-class p {
            margin: 0;
            font-size: 14px;
        }

        .flight-details-body {
            background-color: #eaf0f0;
            padding: 20px;
            border-radius: 8px;
        }

        .flight-entry {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .flight-path {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .flight-time {
            text-align: left;
        }

        .flight-time .date,
        .flight-time .time {
            font-size: 14px;
            color: #555;
        }

        .flight-time .time {
            font-size: 22px;
            color: #333;
            font-weight: bold;
        }

        .dot {
            width: 8px;
            height: 8px;
            background-color: #333;
            border-radius: 50%;
        }

        .duration {
            font-size: 14px;
            color: #555;
            margin: 0 10px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .duration img {
            height: 40px;
        }

        .baggage-note {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
        }

        .baggage-note p {
            font-size: 12px;
            color: #666;
        }

        .baggage-info span {
            font-size: 14px;
            margin-right: 10px;
            display: inline-flex;
            align-items: center;
        }

        .layover {
            background-color: #eaf0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            /* Add padding for spacing */
            margin-bottom: 20px;
            /* Space below layover */
        }

        .layover img {
            height: 30px;
            margin-right: 10px;
            /* Space between image and text */
        }

        .layover p {
            font-size: 14px;
            color: #555;
        }

        .travel-details {
            padding: 20px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section h3 {
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-size: 16px;
            /* Increase the section heading size */
        }

        .traveler-info,
        .billing-details,
        .please-note {
            width: 100%;
            border-collapse: collapse;
        }

        .traveler-info th,
        .traveler-info td,
        .billing-details th,
        .billing-details td {
            padding: 10px;
            border: 1px solid #ddd;
        }

        .traveler-info td {
            text-align: center;
        }

        .traveler-info th {
            background-color: #f9f9f9;
        }

        .status-pending {
            color: red;
        }

        .status-confirm {
            color: green;
        }

        .total {
            font-weight: bold;
            color: #007bff;
        }

        .note {
            font-size: 0.9em;
            color: #555;
        }

        .note a {
            color: #007bff;
            text-decoration: none;
        }

        .note a:hover {
            text-decoration: underline;
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
            .details {
                flex-direction: row;
                /* Stack details on larger tablets */
                align-items: flex-start;
            }

            .details .qr-code {
                margin-top: 10px;
                /* Add margin for spacing when stacked */
            }
        }

        @media (max-width: 768px) {
            .container {
                width: 95%;
                /* Full width on small screens */
                padding: 10px;
            }

            .baggage-note {
                flex-direction: column;
                align-items: start;
            }

            .header {
                flex-direction: column;
            }

            h2 {
                font-size: 1.5em;
            }

            .section h3 {
                font-size: 1.2em;
            }

            .traveler-info th,
            .traveler-info td,
            .billing-details th,
            .billing-details td {
                padding: 8px;
                font-size: 0.9em;
            }

            .note {
                font-size: 0.8em;
            }
        }

        @media screen and (max-width: 600px) {

            .traveler-info {
                display: block;
                overflow-x: auto;
                white-space: nowrap;
            }
        }

        @media (max-width: 580px) {
            .content {
                padding: 0;
            }

            .flight-details {
                padding: 0;
            }

            .travel-details {
                padding: 0;
            }

            .steps {
                padding: 0;
            }
        }

        @media (max-width: 480px) {
            h2 {
                font-size: 1.2em;
            }

            .section h3 {
                font-size: 1em;
            }

            .traveler-info th,
            .traveler-info td,
            .billing-details th,
            .billing-details td {
                padding: 6px;
                font-size: 0.8em;
            }

            .header .actions {
                align-items: flex-start;
                /* Align to the start */
            }

            .header .actions button {
                width: 100%;
                /* Full width for buttons on mobile */
                margin: 5px 0;
                /* Space between buttons */
            }

            .steps {
                display: grid;
                grid-template-columns: 1fr 1fr;
            }

            .step {
                width: 90%;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <p class="help">
                For any changes with your flight, date, route, or names<br />
                Call us at <strong>1-646-736-4922</strong> or
                <a href="#">Click here to reach help center</a>
            </p>
            <div class="actions">
                <button>Print Ticket</button>
                <button>Download Ticket</button>
                <button>Share Ticket</button>
            </div>
        </div>

        <div class="content">
            <h2 class="booking_header">Booking Acknowledgement</h2>
            <div class="details">
                <div class="info">
                    <p><strong>Qatar Booking:</strong> 85533720</p>
                    <p><strong>Email:</strong> Demo@gmail.com</p>
                    <p><strong>Booking on:</strong> Tue, June 11, 2024</p>
                </div>
                <div class="qr-code">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s"
                        alt="QR Code" />
                    <p>A1GEZX</p>
                </div>
            </div>
            <div class="note">
                Please check your terminal and gate information with the airline
                directly at least 24 hours before departure.
            </div>
            <div class="terms">Terms and Confirmation</div>
            <div class="steps">
                <div class="step step1">
                    <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid"
                        alt="90 minutes" />
                    <h4>Check in online, or</h4>
                    <p>
                        Check in at the airport. At most airports, you need to arrive 3
                        hours before departure.
                    </p>
                </div>
                <div class="step step2">
                    <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" alt="90 minutes" />
                    <h4>90 minutes</h4>
                    <p>90 minutes before take-off go through passport control.</p>
                </div>
                <div class="step step3">
                    <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" alt="60 minutes" />
                    <h4>60 minutes</h4>
                    <p>
                        60 minutes before take-off be ready at the gate (Premium Economy,
                        Economy Class).
                    </p>
                </div>
                <div class="step step4">
                    <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" alt="45 minutes" />
                    <h4>45 minutes</h4>
                    <p>
                        45 minutes before take-off be ready at the gate (First Class,
                        Business Class).
                    </p>
                </div>
            </div>
        </div>

        <div class="flight-details">
            <h2>Flight Details</h2>
            <div class="flight-section">
                <h3>Departing Flight</h3>
                <p class="note">
                    Note: The following flight has different class of service
                </p>
                <div class="flight-info">
                    <div class="flight-header">
                        <div class="airline-info">
                            <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                alt="Airline Logo" />
                            <div>
                                <h4>ABC Airline</h4>
                                <p>
                                    Flight 135 &nbsp; | &nbsp; Aircraft: 135 &nbsp; | &nbsp;
                                    Boeing 735 115-138 STD SEAT
                                </p>
                            </div>
                        </div>
                        <div class="travel-class">
                            <p>Travel Class: <strong>Economy</strong></p>
                            <p>Airlines Confirmation [PNR]: <strong>A1GEZX</strong></p>
                        </div>
                    </div>
                    <div class="flight-details-body">
                        <div class="flight-entry">
                            <div class="flight-time">
                                <p class="date">Sun, 29 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>Moi Intl, Mombasa Kenya</p>
                            </div>
                            <div class="flight-path">
                                <span class="dot"></span>
                                <span class="duration">
                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                        alt="Qatar Logo" />
                                    9hr 50min
                                </span>
                                <span class="dot"></span>
                            </div>
                            <div class="flight-time">
                                <p class="date">Sun, 30 Jan 2023</p>
                                <p class="time">02.50</p>
                                <p>JFK Terminal, Nairobi, Kenya</p>
                            </div>
                        </div>
                        <div class="flight-entry">
                            <div class="flight-time">
                                <p class="date">Sun, 30 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>JFK Terminal, Nairobi, Kenya</p>
                            </div>
                            <div class="flight-path">
                                <span class="dot"></span>
                                <span class="duration">
                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                        alt="Qatar Logo" />
                                    9hr 50min
                                </span>
                                <span class="dot"></span>
                            </div>
                            <div class="flight-time">
                                <p class="date">Sun, 29 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>Moi Intl, Mombasa Kenya</p>
                            </div>
                        </div>
                    </div>
                    <div class="baggage-note">
                        <p>
                            Check airlines Fare rules. Most airlines charge baggage fees.
                            Check the baggage Fees for complete details.
                        </p>
                        <div class="baggage-info">
                            <span>🛄 7kg</span>
                            <span>📂 0</span>
                            <span>🔒 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="layover">
            <img src="https://cdn3.iconfinder.com/data/icons/airport-41/32/Artboard_39-512.png" alt="food" />
            <p>3h 5m layover</p>
            <p>Stopover in Mumbai (BOM), you will have to change the FLIGHT</p>
        </div>

        <div class="flight-details">
            <div class="flight-section">
                <h3>Departing Flight</h3>
                <p class="note">
                    Note: The following flight has different class of service
                </p>
                <div class="flight-info">
                    <div class="flight-header">
                        <div class="airline-info">
                            <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                alt="Airline Logo" />
                            <div>
                                <h4>ABC Airline</h4>
                                <p>
                                    Flight 135 &nbsp; | &nbsp; Aircraft: 135 &nbsp; | &nbsp;
                                    Boeing 735 115-138 STD SEAT
                                </p>
                            </div>
                        </div>
                        <div class="travel-class">
                            <p>Travel Class: <strong>Economy</strong></p>
                            <p>Airlines Confirmation [PNR]: <strong>A1GEZX</strong></p>
                        </div>
                    </div>
                    <div class="flight-details-body">
                        <div class="flight-entry">
                            <div class="flight-time">
                                <p class="date">Sun, 29 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>Moi Intl, Mombasa Kenya</p>
                            </div>
                            <div class="flight-path">
                                <span class="dot"></span>
                                <span class="duration">
                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                        alt="Qatar Logo" />
                                    9hr 50min
                                </span>
                                <span class="dot"></span>
                            </div>
                            <div class="flight-time">
                                <p class="date">Sun, 30 Jan 2023</p>
                                <p class="time">02.50</p>
                                <p>JFK Terminal, Nairobi, Kenya</p>
                            </div>
                        </div>
                        <div class="flight-entry">
                            <div class="flight-time">
                                <p class="date">Sun, 30 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>JFK Terminal, Nairobi, Kenya</p>
                            </div>
                            <div class="flight-path">
                                <span class="dot"></span>
                                <span class="duration">
                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png"
                                        alt="Qatar Logo" />
                                    9hr 50min
                                </span>
                                <span class="dot"></span>
                            </div>
                            <div class="flight-time">
                                <p class="date">Sun, 29 Jan 2023</p>
                                <p class="time">14.50</p>
                                <p>Moi Intl, Mombasa Kenya</p>
                            </div>
                        </div>
                    </div>
                    <div class="baggage-note">
                        <p>
                            Check airlines Fare rules. Most airlines charge baggage fees.
                            Check the baggage Fees for complete details.
                        </p>
                        <div class="baggage-info">
                            <span>🛄 7kg</span>
                            <span>📂 0</span>
                            <span>🔒 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="travel-details">
            <div class="section">
                <h2>Traveler Information</h2>
                <table class="traveler-info">
                    <tr>
                        <th>E-Ticket Number</th>
                        <th>PNR Number</th>
                        <th>Status</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Request</th>
                        <th>Gender</th>
                    </tr>
                    <tr>
                        <td>A1GEZX</td>
                        <td>Pending</td>
                        <td class="status-pending">Pending</td>
                        <td>Animesh</td>
                        <td>Sadh</td>
                        <td>Sadh</td>
                        <td>Male</td>
                    </tr>
                    <tr>
                        <td>A25EZX</td>
                        <td>Confirm</td>
                        <td class="status-confirm">Confirm</td>
                        <td>Animesh</td>
                        <td>Sadh</td>
                        <td>Sadh</td>
                        <td>Male</td>
                    </tr>
                </table>
                <p class="note">
                    Disclaimer: Not all flights offer free meals. Any specific request you may
                    have will be sent to the airline(s). Please contact your airline(s)
                    directly, prior to your departure date, to confirm what meal options may
                    be available and if your other requests can be fulfilled.
                </p>
            </div>
            <div class="section">
                <h2>Billing Details</h2>
                <table class="billing-details">
                    <tr>
                        <th>Flight Price Details</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>1 Adult Ticket</td>
                        <td>$281.00</td>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td>$281.00</td>
                    </tr>
                    <tr>
                        <td class="total">Flight Total</td>
                        <td class="total">$281.00</td>
                    </tr>
                </table>
            </div>
            <div class="section">
                <h2>Please Note</h2>
                <p class="note">
                    Fares are not guaranteed until ticketed. Taxes, fees, and baggage charges
                    are subject to change and may be additional. For more information, please
                    review our <a href="#">Privacy Policy</a> or <a href="#">Contact Us</a>.
                </p>
            </div>
        </div>
    </div>
</body>

</html>`

export const home=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Acknowledgement</title>
</head>
<body style="margin: 0; padding: 20px 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
    <!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->

    <center style="width: 100%;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #ddd;">
            <!-- Header Section -->
            <tr>
                <td style="padding: 20px; background-color: #f0f5ff;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td style="font-size: 12px; color: #555; line-height: 1.5;">
                                For any changes with your flight, date, route, or names<br>
                                Call us at <strong>1-646-736-4922</strong> or 
                                <a href="#" style="color: #007bff; text-decoration: none;">Click here to reach help center</a>
                            </td>
                            <td style="text-align: right; vertical-align: top;">
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Print Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Download Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Share Ticket</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Main Content -->
            <tr>
                <td style="padding: 20px;">
                    <h2 style="font-size: 18px; color: #e56232; margin: 0 0 15px 0;">Booking Acknowledgement</h2>
                    
                    <!-- Booking Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                        <tr>
                            <td style="vertical-align: top; width: 70%;">
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Qatar Booking:</strong> 85533720</p>
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong> Demo@gmail.com</p>
                                <p style="margin: 0; font-size: 14px;"><strong>Booking on:</strong> Tue, June 11, 2024</p>
                            </td>
                            <td style="text-align: center; vertical-align: top; width: 30%;">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" 
                                     alt="QR Code" width="80" style="display: block; margin: 0 auto 5px auto;">
                                <p style="margin: 0; font-size: 14px;">A1GEZX</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Note -->
                    <div style="background: #f1f9ff; border-left: 4px solid #007bff; padding: 10px 15px; margin-bottom: 20px;">
                        <p style="margin: 0; font-size: 14px;">Please check your terminal and gate information with the airline directly at least 24 hours before departure.</p>
                    </div>

                    <!-- Steps -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #f9f9f9; border-top: 1px solid #ddd;">
                        <tr>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #f0f5ff;">
                                <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid" 
                                     alt="Check in" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">Check in online, or</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" 
                                     alt="90 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">90 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">90 minutes before take-off go through passport control.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" 
                                     alt="60 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">60 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class).</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" 
                                     alt="45 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">45 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">45 minutes before take-off be ready at the gate (First Class, Business Class).</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Flight Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #333; margin: 0 0 15px 0;">Flight Details</h2>
                                <h3 style="color: #ff6600; font-size: 16px; margin: 0 0 10px 0;">Departing Flight</h3>
                                <p style="font-size: 14px; color: #555; margin: 0 0 15px 0;">Note: The following flight has different class of service</p>
                                
                                <!-- Flight Info -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf0f0; padding: 15px; border-radius: 8px;">
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top;">
                                                        <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                             alt="Airline Logo" width="60" style="display: block; ">
                                                    </td>
                                                    <td style="vertical-align: top;">
                                                        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">ABC Airline</h4>
                                                        <p style="margin: 0; font-size: 12px; color: #666;">Flight 135 | Aircraft: 135 | Boeing 735 115-138 STD SEAT</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Travel Class:</strong> Economy</p>
                                            <p style="margin: 0; font-size: 14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <!-- Flight Timeline -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 30%;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 29 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">14.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">Moi Intl, Mombasa Kenya</p>
                                                    </td>
                                                    <td style="vertical-align: middle; width: 40%; text-align: center;">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center">
                                                            <tr style="vertical-align: center;display: flex;flex-direction: column;">
                                                                <!-- <td style="width: 8px; height: 8px; background-color: #333; border-radius: 50%;"></td> -->
                                                                <td style="padding: 0 10px;">
                                                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                                         alt="Airline Logo" width="30" style="display: block; margin: 0 auto;">
                                                                </td>
                                                                <td style="font-size: 14px; color: #555;">9hr 50min</td>
                                                                <!-- <td style="width: 8px; height: 8px; background-color: #333; border-radius: 50%;"></td> -->
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="vertical-align: top; width: 30%; text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 30 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">02.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">JFK Terminal, Nairobi, Kenya</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Additional flight entries would follow same pattern -->
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Traveler Information -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Traveler Information</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr style="background-color: #f9f9f9;">
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">E-Ticket Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">PNR Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Status</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">First name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Last name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Request</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Gender</th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">A1GEZX</td>
                                        <td style="padding: 10px; font-size: 14px;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px; color: red;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px;">Animesh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Male</td>
                                    </tr>
                                    <!-- Additional rows would follow same pattern -->
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Billing Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Billing Details</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">1 Adult Ticket</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">Subtotal</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">Flight Total</td>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">$281.00</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer Note -->
                                                     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 0px;">
                                                        <h2 style="font-size: 18px; color: #e56232;  ">Please Note</h2>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: -20px;">
                        <tr>
                            <td>
                                <p style="font-size: 14px; color: #555; line-height: 1.5;">
                                    Fares are not guaranteed until ticketed. Taxes, fees, and baggage charges
                                    are subject to change and may be additional. For more information, please
                                    review our <a href="#" style="color: #007bff; text-decoration: none;">Privacy Policy</a> 
                                    or <a href="#" style="color: #007bff; text-decoration: none;">Contact Us</a>.
                                </p>
                            </td>
                        </tr>
                    </table>
                </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
`

export const home2=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Acknowledgement</title>
</head>
<body style="margin: 0; padding: 20px 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
    <!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->

    <center style="width: 100%;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="800" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #ddd;">
            <!-- Header Section -->
            <tr>
                <td style="padding: 20px; background-color: #f0f5ff;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- <tr>
                            <td style="font-size: 12px; color: #555; line-height: 1.5;">
                                For any changes with your flight, date, route, or names<br>
                                Call us at <strong>1-646-736-4922</strong> or 
                                <a href="#" style="color: #007bff; text-decoration: none;">Click here to reach help center</a>
                            </td>
                            <td style="text-align: right; vertical-align: top;">
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Print Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Download Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Share Ticket</a>
                            </td>
                        </tr> -->

                        <tr>
                            <td style="font-size: 12px; color: #555; line-height: 1.5; width: 60%;">
                                For any changes with your flight, date, route, or names<br>
                                Call us at <strong>1-646-736-4922</strong> or 
                                <a href="#" style="color: #007bff; text-decoration: none;">Click here to reach help center</a>
                            </td>
                            <td style="text-align: right; vertical-align: top; width: 40%;">
                                <table border="0" cellpadding="0" cellspacing="0" align="right" style="display: inline-block;">
                                    <tr>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Print Ticket</a>
                                        </td>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Download Ticket</a>
                                        </td>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Share Ticket</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Media Query for Small Screens -->
                        <style type="text/css">
                            @media only screen and (max-width: 600px) {
                                td[class="responsive-td"] {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                }
                                table[class="responsive-table"] {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                }
                                table[class="responsive-table"] td {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                    padding: 5px 0 !important;
                                }
                            }
                        </style>
                    </table>
                </td>
            </tr>

            <!-- Main Content -->
            <tr>
                <td style="padding: 20px;">
                    <h2 style="font-size: 18px; color: #e56232; margin: 0 0 15px 0;">Booking Acknowledgement</h2>
                    
                    <!-- Booking Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                        <tr>
                            <td style="vertical-align: top; width: 70%;">
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Qatar Booking:</strong> 85533720</p>
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong> Demo@gmail.com</p>
                                <p style="margin: 0; font-size: 14px;"><strong>Booking on:</strong> Tue, June 11, 2024</p>
                            </td>
                            <td style="text-align: center; vertical-align: top; width: 30%;">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" 
                                     alt="QR Code" width="80" style="display: block; margin: 0 auto 5px auto;">
                                <p style="margin: 0; font-size: 14px;">A1GEZX</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Note -->
                    <div style="background: #f1f9ff; border-left: 4px solid #007bff; padding: 10px 15px; margin-bottom: 20px;">
                        <p style="margin: 0; font-size: 14px;">Please check your terminal and gate information with the airline directly at least 24 hours before departure.</p>
                    </div>

                    <!-- Steps -->

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" ">
                        <tr>
                            <!-- <td style="padding: 15px; text-align: center; vertical-align: top;"> -->
                                <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid" 
                                     alt="Check in" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">Check in online, or</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top; border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" 
                                     alt="90 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">90 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">90 minutes before take-off go through passport control.</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" 
                                     alt="60 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">60 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class).</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" 
                                     alt="45 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">45 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">45 minutes before take-off be ready at the gate (First Class, Business Class).</p>
                            </td>
                        </tr>
                    </table>

                    <!-- <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #f9f9f9; border-top: 1px solid #ddd;">
                        <tr>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #f0f5ff;">
                                <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid" 
                                     alt="Check in" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">Check in online, or</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" 
                                     alt="90 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">90 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">90 minutes before take-off go through passport control.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" 
                                     alt="60 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">60 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class).</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" 
                                     alt="45 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">45 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">45 minutes before take-off be ready at the gate (First Class, Business Class).</p>
                            </td>
                        </tr>
                    </table> -->

                    <!-- Flight Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #333; margin: 0 0 15px 0;">Flight Details</h2>
                                <h3 style="color: #ff6600; font-size: 16px; margin: 0 0 10px 0;">Departing Flight</h3>
                                <p style="font-size: 14px; color: #555; margin: 0 0 15px 0;">Note: The following flight has different class of service</p>
                                
                                <!-- Flight Info -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf0f0; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td>
                                                    <td style="vertical-align: top;margin-right:0px;">
                                                        <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                             alt="Airline Logo" width="60" style="display: block; ">
                                                    </td>
                                                    <td style="vertical-align: top;">
                                                        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">ABC Airline</h4>
                                                        <p style="margin: 0; font-size: 10px; color: #666;">Flight 135 | Aircraft: 135 | Boeing 735 115-138 STD SEAT</p>
                                                    </td>
                                                </td>
                                                    <td style="text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Travel Class:</strong> Economy</p>
                                                        <p style="margin: 0; font-size: 11px;">Airlines Confirmation [PNR]: A1GEZX</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                       
                                    </tr>
                                    <tr>
                                        <!-- <td style="padding-top: 15px;">
                                            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Travel Class:</strong> Economy</p>
                                            <p style="margin: 0; font-size: 14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                                        </td> -->
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <!-- Flight Timeline -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 30%;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 29 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">14.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">Moi Intl, Mombasa Kenya</p>
                                                    </td>
                                                    <td style="vertical-align: middle; width: 40%; text-align: center;">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center;">
                                                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                                         alt="Airline Logo" width="30" style="display: block; margin: 0 auto;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center; font-size: 14px; color: #555;">
                                                                    9hr 50min
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td> 
                                                   
                                                    <td style="vertical-align: top; width: 30%; text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 30 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">02.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">JFK Terminal, Nairobi, Kenya</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Additional flight entries would follow same pattern -->
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf0f0; padding: 15px; border-radius: 8px;">
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td>
                                                    <td style="vertical-align: top;margin-right:0px;">
                                                        <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                             alt="Airline Logo" width="60" style="display: block; ">
                                                    </td>
                                                    <td style="vertical-align: top;">
                                                        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">ABC Airline</h4>
                                                        <p style="margin: 0; font-size: 10px; color: #666;">Flight 135 | Aircraft: 135 | Boeing 735 115-138 STD SEAT</p>
                                                    </td>
                                                </td>
                                                    <td style="text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Travel Class:</strong> Economy</p>
                                                        <p style="margin: 0; font-size: 11px;">Airlines Confirmation [PNR]: A1GEZX</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                       
                                    </tr>
                                    <tr>
                                        <!-- <td style="padding-top: 15px;">
                                            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Travel Class:</strong> Economy</p>
                                            <p style="margin: 0; font-size: 14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                                        </td> -->
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <!-- Flight Timeline -->
                                            <table style="margin-bottom: 10px;" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 30%;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 29 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">14.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">Moi Intl, Mombasa Kenya</p>
                                                    </td>
                                                    <td style="vertical-align: middle; width: 40%; text-align: center;">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center;">
                                                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                                         alt="Airline Logo" width="30" style="display: block; margin: 0 auto;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center; font-size: 14px; color: #555;">
                                                                    9hr 50min
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td> 
                                                   
                                                    <td style="vertical-align: top; width: 30%; text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 30 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">02.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">JFK Terminal, Nairobi, Kenya</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Additional flight entries would follow same pattern -->
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Traveler Information -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Traveler Information</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr style="background-color: #f9f9f9;">
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">E-Ticket Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">PNR Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Status</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">First name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Last name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Request</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Gender</th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">A1GEZX</td>
                                        <td style="padding: 10px; font-size: 14px;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px; color: red;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px;">Animesh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Male</td>
                                    </tr>
                                    <!-- Additional rows would follow same pattern -->
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Billing Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Billing Details</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">1 Adult Ticket</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">Subtotal</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">Flight Total</td>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">$281.00</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer Note -->
                                                     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 0px;">
                                                        <h2 style="font-size: 18px; color: #e56232;  ">Please Note</h2>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: -20px;">
                        <tr>
                            <td>
                                <p style="font-size: 14px; color: #555; line-height: 1.5;">
                                    Fares are not guaranteed until ticketed. Taxes, fees, and baggage charges
                                    are subject to change and may be additional. For more information, please
                                    review our <a href="#" style="color: #007bff; text-decoration: none;">Privacy Policy</a> 
                                    or <a href="#" style="color: #007bff; text-decoration: none;">Contact Us</a>.
                                </p>
                            </td>
                        </tr>
                    </table>
                </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
`
export const home3=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Acknowledgement</title>
</head>
<body style="margin: 0; padding: 20px 0; background-color: #f8f9fa; font-family: Arial, sans-serif;">
    <!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->

    <center style="width: 100%;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="800" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #ddd;">
            <!-- Header Section -->
            <tr>
                <td style="padding: 20px; background-color: #f0f5ff;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- <tr>
                            <td style="font-size: 12px; color: #555; line-height: 1.5;">
                                For any changes with your flight, date, route, or names<br>
                                Call us at <strong>1-646-736-4922</strong> or 
                                <a href="#" style="color: #007bff; text-decoration: none;">Click here to reach help center</a>
                            </td>
                            <td style="text-align: right; vertical-align: top;">
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Print Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Download Ticket</a>
                                <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px; margin-left: 5px;">Share Ticket</a>
                            </td>
                        </tr> -->

                        <tr>
                            <td style="font-size: 12px; color: #555; line-height: 1.5; width: 60%;">
                                For any changes with your flight, date, route, or names<br>
                                Call us at <strong>1-646-736-4922</strong> or 
                                <a href="#" style="color: #007bff; text-decoration: none;">Click here to reach help center</a>
                            </td>
                            <td style="text-align: right; vertical-align: top; width: 40%;">
                                <table border="0" cellpadding="0" cellspacing="0" align="right" style="display: inline-block;">
                                    <tr>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Print Ticket</a>
                                        </td>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Download Ticket</a>
                                        </td>
                                        <td style="padding: 5px;">
                                            <a href="#" style="display: inline-block; background: #007bff; color: white; text-decoration: none; padding: 8px 5px; border-radius: 5px; font-size: 10px;">Share Ticket</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Media Query for Small Screens -->
                        <style type="text/css">
                            @media only screen and (max-width: 600px) {
                                td[class="responsive-td"] {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                }
                                table[class="responsive-table"] {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                }
                                table[class="responsive-table"] td {
                                    display: block !important;
                                    width: 100% !important;
                                    text-align: left !important;
                                    padding: 5px 0 !important;
                                }
                            }
                        </style>
                    </table>
                </td>
            </tr>

            <!-- Main Content -->
            <tr>
                <td style="padding: 20px;">
                    <h2 style="font-size: 18px; color: #e56232; margin: 0 0 15px 0;">Booking Acknowledgement</h2>
                    
                    <!-- Booking Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                        <tr>
                            <td style="vertical-align: top; width: 70%;">
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Qatar Booking:</strong> 85533720</p>
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Email:</strong> Demo@gmail.com</p>
                                <p style="margin: 0; font-size: 14px;"><strong>Booking on:</strong> Tue, June 11, 2024</p>
                            </td>
                            <td style="text-align: center; vertical-align: top; width: 30%;">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s" 
                                     alt="QR Code" width="80" style="display: block; margin: 0 auto 5px auto;">
                                <p style="margin: 0; font-size: 14px;">A1GEZX</p>
                            </td>
                        </tr>
                    </table>

                    <!-- Note -->
                    <div style="background: #f1f9ff; border-left: 4px solid #007bff; padding: 10px 15px; margin-bottom: 20px;">
                        <p style="margin: 0;color: rgb(106, 106, 106); font-size: 14px;">Please check your terminal and gate information with the airline directly at least 24 hours before departure.</p>
                    </div>

                    <!-- Steps -->

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" ">
                        <tr>
                            <!-- <td style="padding: 15px; text-align: center; vertical-align: top;"> -->
                                <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid" 
                                     alt="Check in" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">Check in online, or</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top; border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" 
                                     alt="90 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">90 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">90 minutes before take-off go through passport control.</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" 
                                     alt="60 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">60 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class).</p>
                            </td>
                            <td style="padding: 30px; text-align: center; vertical-align: top;border-radius: 20px; background: linear-gradient(90deg, #d5ddf0, #ffffff);">
                                <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" 
                                     alt="45 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #333;">45 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">45 minutes before take-off be ready at the gate (First Class, Business Class).</p>
                            </td>
                        </tr>
                    </table>

                    <!-- <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #f9f9f9; border-top: 1px solid #ddd;">
                        <tr>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #f0f5ff;">
                                <img src="https://cdn-icons-png.freepik.com/256/16200/16200876.png?semt=ais_hybrid" 
                                     alt="Check in" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">Check in online, or</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">Check in at the airport. At most airports, you need to arrive 3 hours before departure.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/456/456432.png" 
                                     alt="90 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">90 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">90 minutes before take-off go through passport control.</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/657/657674.png" 
                                     alt="60 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">60 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">60 minutes before take-off be ready at the gate (Premium Economy, Economy Class).</p>
                            </td>
                            <td style="padding: 15px; text-align: center; vertical-align: top; background: #ffffff;">
                                <img src="https://cdn-icons-png.flaticon.com/512/799/799627.png" 
                                     alt="45 minutes" width="40" style="display: block; margin: 0 auto 10px auto;">
                                <h4 style="margin: 0 0 5px 0; font-size: 14px;">45 minutes</h4>
                                <p style="margin: 0; font-size: 12px; color: #777;">45 minutes before take-off be ready at the gate (First Class, Business Class).</p>
                            </td>
                        </tr>
                    </table> -->

                    <!-- Flight Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #333; margin: 0 0 15px 0;">Flight Details</h2>
                                <h3 style="color: #ff6600; font-size: 16px; margin: 0 0 10px 0;">Departing Flight</h3>
                                <p style="font-size: 14px; color: #555; margin: 0 0 15px 0;">Note: The following flight has different class of service</p>
                                
                                <!-- Flight Info -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf0f0; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td>
                                                    <td style="vertical-align: top;margin-right:0px;">
                                                        <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                             alt="Airline Logo" width="60" style="display: block; ">
                                                    </td>
                                                    <td style="vertical-align: top;">
                                                        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">ABC Airline</h4>
                                                        <p style="margin: 0; font-size: 10px; color: #666;">Flight 135 | Aircraft: 135 | Boeing 735 115-138 STD SEAT</p>
                                                    </td>
                                                </td>
                                                    <td style="text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Travel Class:</strong> Economy</p>
                                                        <p style="margin: 0; font-size: 11px;">Airlines Confirmation [PNR]: A1GEZX</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                       
                                    </tr>
                                    <tr>
                                        <!-- <td style="padding-top: 15px;">
                                            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Travel Class:</strong> Economy</p>
                                            <p style="margin: 0; font-size: 14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                                        </td> -->
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <!-- Flight Timeline -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 30%;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 29 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">14.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">Moi Intl, Mombasa Kenya</p>
                                                    </td>
                                                    <td style="vertical-align: middle; width: 40%; text-align: center;">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center;">
                                                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                                         alt="Airline Logo" width="30" style="display: block; margin: 0 auto;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center; font-size: 14px; color: #555;">
                                                                    9hr 50min
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td> 
                                                   
                                                    <td style="vertical-align: top; width: 30%; text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 30 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">02.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">JFK Terminal, Nairobi, Kenya</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                   
                                    <!-- Additional flight entries would follow same pattern -->
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" padding: 5px; border-radius: 8px;  font-family: Arial, sans-serif;">
                                    <tr>
                                        <!-- Text Section -->
                                        <td style="font-size: 12px; color: #333; vertical-align: middle;">
                                            Check airlines Fare rules. Most airlines charge baggage fees. Check the baggage Fees for complete details.
                                        </td>
                                        <!-- Baggage Icons Section -->
                                        <td style="text-align: right; vertical-align: middle; white-space: nowrap;">
                                            <span style="font-size: 14px; color: #555; margin-left: 10px;">🛄 7kg</span>
                                            <span style="font-size: 14px; color: #555; margin-left: 10px;">📂 0</span>
                                            <span style="font-size: 14px; color: #555; margin-left: 10px;">🔒 1</span>
                                        </td>
                                    </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #e9f7fa; padding: 5px; margin-bottom: 5px; border-radius: 8px; font-family: Arial, sans-serif;">
                                    <tr class="text-align: center;">
                                        <!-- Icon Section -->
                                        <!-- <td style="vertical-align: middle; width: 40px; padding-right: 10px; text-align: center;">
                                            <img src="https://cdn3.iconfinder.com/data/icons/airport-41/32/Artboard_39-512.png" alt="layover" width="40" style="" />
                                        </td> -->
                                        <!-- Text Section -->
                                        <td style="vertical-align:bottom; text-align: center;">
                                            <img src="https://cdn3.iconfinder.com/data/icons/airport-41/32/Artboard_39-512.png" alt="layover" width="30" style="padding:0;margin-bottom: -10px;" />

                                            <span style="vertical-align: center;font-size: 12px; color:  #777; text-align: center;">3h 5m layover</span>
                                            <span style="vertical-align: center; font-size: 12px; color: #777;text-align: center;">Stopover in Mumbai (BOM), you will have to change the FLIGHT</span>
                                        </td>
                                    </tr>
                                </table>
                                


                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #eaf0f0; padding: 15px; border-radius: 8px;">
                                    <tr>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td>
                                                    <td style="vertical-align: top;margin-right:0px;">
                                                        <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                             alt="Airline Logo" width="60" style="display: block; ">
                                                    </td>
                                                    <td style="vertical-align: top;">
                                                        <h4 style="margin: 10px 0 5px 0; font-size: 14px;">ABC Airline</h4>
                                                        <p style="margin: 0; font-size: 10px; color: #666;">Flight 135 | Aircraft: 135 | Boeing 735 115-138 STD SEAT</p>
                                                    </td>
                                                </td>
                                                    <td style="text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 12px;"><strong>Travel Class:</strong> Economy</p>
                                                        <p style="margin: 0; font-size: 11px;">Airlines Confirmation [PNR]: A1GEZX</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                       
                                    </tr>
                                    <tr>
                                        <!-- <td style="padding-top: 15px;">
                                            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Travel Class:</strong> Economy</p>
                                            <p style="margin: 0; font-size: 14px;"><strong>Airlines Confirmation [PNR]:</strong> A1GEZX</p>
                                        </td> -->
                                    </tr>
                                    <tr>
                                        <td style="padding-top: 15px;">
                                            <!-- Flight Timeline -->
                                            <table style="margin-bottom: 10px;" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td style="vertical-align: top; width: 30%;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 29 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">14.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">Moi Intl, Mombasa Kenya</p>
                                                    </td>
                                                    <td style="vertical-align: middle; width: 40%; text-align: center;">
                                                        <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center;">
                                                                    <img src="https://crystalpng.com/wp-content/uploads/2023/09/Qatar-airways-animal-logo.png" 
                                                                         alt="Airline Logo" width="30" style="display: block; margin: 0 auto;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding: 5px 0; text-align: center; font-size: 14px; color: #555;">
                                                                    9hr 50min
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td> 
                                                   
                                                    <td style="vertical-align: top; width: 30%; text-align: right;">
                                                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #555;">Sun, 30 Jan 2023</p>
                                                        <p style="margin: 0 0 5px 0; font-size: 22px; color: #333; font-weight: bold;">02.50</p>
                                                        <p style="margin: 0; font-size: 14px; color: #555;">JFK Terminal, Nairobi, Kenya</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- Additional flight entries would follow same pattern -->
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Traveler Information -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Traveler Information</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr style="background-color: #f9f9f9;">
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">E-Ticket Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">PNR Number</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Status</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">First name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Last name</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Request</th>
                                        <th style="text-align: left; font-size: 14px; padding: 10px;">Gender</th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">A1GEZX</td>
                                        <td style="padding: 10px; font-size: 14px;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px; color: red;">Pending</td>
                                        <td style="padding: 10px; font-size: 14px;">Animesh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Sadh</td>
                                        <td style="padding: 10px; font-size: 14px;">Male</td>
                                    </tr>
                                    <!-- Additional rows would follow same pattern -->
                                </table>
                                <div style="background: #f1f9ff; border-left: 4px solid #007bff; padding: 10px 15px; margin-top: 10px;">
                                    <p style="margin: 0; color: rgb(106, 106, 106); font-size: 14px;">Disclaimer: Not all flights offer free meals. Any specific request you may have will be sent to the airline(s). Please contact your airline(s) directly, prior to your departure date, to confirm what meal options may be available and if your other requests can be fulfilled.</p>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- Billing Details -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                        <tr>
                            <td>
                                <h2 style="font-size: 18px; color: #e56232;  margin: 0 0 15px 0;">Billing Details</h2>
                                <table border="1" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">1 Adult Ticket</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px;">Subtotal</td>
                                        <td style="padding: 10px; font-size: 14px;">$281.00</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">Flight Total</td>
                                        <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #007bff;">$281.00</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- Footer Note -->
                                                     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 0px;">
                                                        <h2 style="font-size: 18px; color: #e56232;  ">Please Note</h2>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: -20px;">
                        <tr>
                            <td>
                                <div style="background: #f1f9ff; border-left: 4px solid #007bff; padding: 1px;  margin-top: 10px;">

                                <p style="font-size: 14px; color: #555; line-height: 1.5;margin-left: 10px;">
                                    Fares are not guaranteed until ticketed. Taxes, fees, and baggage charges
                                    are subject to change and may be additional. For more information, please
                                    review our <a href="#" style="color: #007bff; text-decoration: none;">Privacy Policy</a> 
                                    or <a href="#" style="color: #007bff; text-decoration: none;">Contact Us</a>.
                                </p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
`