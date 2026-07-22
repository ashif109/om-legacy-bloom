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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-[color:var(--card)] p-8 gold-border animate-in zoom-in-95 duration-200 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-8">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--gold)]/10 text-[color:var(--gold)] mx-auto mb-4 border border-[color:var(--gold)]/30">
            <Heart size={30} />
          </div>
          <h2 className="text-2xl font-display text-gold-gradient">Support Our Mission</h2>
          <p className="text-sm text-gray-400 mt-2">
            Your contribution helps spread the knowledge of environmental conservation and climate action globally.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[101, 501, 1100].map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val)}
                className={`py-3 rounded-xl border font-medium text-sm transition-all ${
                  amount === val 
                    ? "border-[color:var(--gold)] bg-[color:var(--gold)]/10 text-[color:var(--gold)]" 
                    : "border-[color:var(--gold)]/20 text-cream hover:border-[color:var(--gold)]/50"
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>

          <div className="relative mt-4">
            <span className="absolute left-4 top-3.5 text-gray-400">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-black/50 border border-[color:var(--gold)]/30 rounded-xl py-3 pl-8 pr-4 text-cream font-medium focus:border-[color:var(--gold)] focus:ring-1 focus:ring-[color:var(--gold)] focus:outline-none"
              placeholder="Other Amount"
            />
          </div>

          <button 
            onClick={handleDonate}
            disabled={loading}
            className="w-full btn-gold rounded-xl py-4 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : `Donate ₹${amount}`}
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-4">
            <ShieldCheck size={14} className="text-green-500/70" />
            <span>Secured by Razorpay. 100% safe & secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
