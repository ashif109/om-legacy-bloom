import { createServerFn } from "@tanstack/react-start";
import Razorpay from "razorpay";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "test_key";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "test_secret";

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator((data: { amount: number }) => data)
  .handler(async ({ data }) => {
    try {
      // Razorpay expects amount in paise (1 INR = 100 paise)
      const options = {
        amount: data.amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      return { success: true, order, key: RAZORPAY_KEY_ID };
    } catch (error) {
      console.error("Razorpay order creation failed", error);
      throw new Error("Failed to create order");
    }
  });

export const verifyRazorpaySignature = createServerFn({ method: "POST" })
  .validator((data: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) => data)
  .handler(async ({ data }) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
      
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      return { success: true, message: "Payment verified successfully" };
    } else {
      return { success: false, message: "Invalid signature" };
    }
  });
