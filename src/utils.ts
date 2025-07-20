import config from "config";

export const MailText = (order) => {
    return `Hello ${order.data.customerId.firstName} ${order.data.customerId.lastName},\n\nThank you for ordering from Pizza Express!\n\nOrder ID: ${order.data._id}\nRestaurant: ${order.data.tenantId}\n\nWe are preparing your delicious pizza and will notify you once it is out for delivery.\n\nYou can view your order details here: ${config.get("frontend.url")}/order/${order.data._id}?restaurantId=${order.data.tenantId}\n\nBon appétit!\n\nBest regards,\nPizza Express Team`
}

export const MailHtml = (order) => {
    return `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                <div style="background: #fc7338; padding: 20px; text-align: center;">
                  <img src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt="Pizza" style="width: 120px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.15); margin-bottom: 10px;" />
                  <h1 style="color: #fff; margin: 0;">Pizza Express</h1>
                </div>
                <div style="padding: 24px; background: #fff;">
                  <h2 style="color: #fc7338;">Order Confirmation</h2>
                  <p>Hi <b>${order.data.customerId.firstName} ${order.data.customerId.lastName}</b>,</p>
                  <p>Thank you for your order! We are excited to prepare your delicious pizza.</p>
                  <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0;">Order ID:</td><td><b>${order.data._id}</b></td></tr>
                    <tr><td style="padding: 8px 0;">Restaurant:</td><td><b>${order.data.tenantId}</b></td></tr>
                  </table>
                  <p>You can view your order details <a href="${config.get("frontend.url")}/order/${order.data._id}?restaurantId=${order.data.tenantId}" style="color: #fc7338; text-decoration: underline;">here</a>.</p>
                  <p style="margin-top: 32px;">Bon appétit!<br/>The Pizza Express Team</p>
                </div>
                <div style="background: #f8f8f8; padding: 12px; text-align: center; color: #888; font-size: 12px;">
                  &copy; ${new Date().getFullYear()} Pizza Express. All rights reserved.
                </div>
              </div>
            `;
}