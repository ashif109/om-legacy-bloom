import { useState, useEffect } from "react";
import { X, Heart, ShieldCheck } from "lucide-react";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/razorpay";
import { toast } from "sonner"; // Assuming sonner is available for toasts

export function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDonate = async () => {
    if (!amount || amount < 1) {
      toast.error("Please enter a valid amount.");
      return;
    }
    
    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await createRazorpayOrder({ data: { amount } });
      if (!res.success) throw new Error("Failed to create order");
      
      const { order, key } = res;
      
      // 2. Open Razorpay Checkout
      const options = {
        key: key, 
        amount: order.amount,
        currency: order.currency,
        name: "Triyambakam Environmental Initiatives",
        description: "Donation for the Earth",
        image: "https://example.com/your_logo", // Replace with actual logo URL
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          try {
            const verifyRes = await verifyRazorpaySignature({
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            });
            
            if (verifyRes.success) {
              toast.success("Thank you for your generous donation!");
              onClose();
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (e) {
            toast.error("Verification error.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#D4AF37" // Gold color
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
      
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl glass-card p-8 border border-gold/30 animate-in zoom-in-95 duration-200 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-gold/10"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-gold mx-auto mb-4 border border-gold/30 font-display">
            <Heart size={28} />
          </div>
          <h2 className="text-2xl font-display text-gold-gradient">Support Our Mission</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your contribution helps spread the knowledge of environmental conservation and climate action globally.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[101, 501, 1100].map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val)}
                className={`py-3 rounded-xl border font-semibold text-sm transition-all ${
                  amount === val 
                    ? "border-gold bg-gold/15 text-gold shadow-sm" 
                    : "border-gold/30 bg-white/70 text-foreground hover:border-gold/60"
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>

          <div className="relative mt-4">
            <span className="absolute left-4 top-3.5 text-muted-foreground font-semibold">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-white/90 border border-gold/30 rounded-xl py-3 pl-8 pr-4 text-foreground font-semibold focus:border-gold focus:ring-2 focus:ring-gold/20 focus:outline-none"
              placeholder="Other Amount"
            />
          </div>

          <button 
            onClick={handleDonate}
            disabled={loading}
            className="w-full btn-gold rounded-xl py-4 font-bold uppercase tracking-widest text-xs mt-6 flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : `Donate ₹${amount}`}
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-4 font-medium">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Secured by Razorpay. 100% safe & secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
