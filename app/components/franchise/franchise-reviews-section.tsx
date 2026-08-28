import ReviewsSection from "@/app/components/home/reviews-section";
import type { ReviewsContent } from "@/app/types/reviews";

// Same reviews carousel used on Home/About (autoplay, drag, truncate +
// Read More popup) — just pointed at franchise-partner testimonials
// instead of gym-member reviews.
const FRANCHISE_REVIEWS_CONTENT: ReviewsContent = {
  headline: "What Our Franchise Partners Say",
  ratingValue: "4.8/5",
  ratingLabel: "From 50+ Partners",
  reviews: [
    {
      id: "rahul-mehta",
      name: "Rahul Mehta",
      rating: 5,
      text: "RP8 Fitness gave us the perfect business opportunity. Their support team was outstanding and helped us launch within just a few months.",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: "anjali-sharma",
      name: "Anjali Sharma",
      rating: 5,
      text: "From setup to launch, everything was seamless. Our members love the experience and retention has been better than we expected.",
      avatar: "https://i.pravatar.cc/150?img=48",
    },
    {
      id: "vikram-singh",
      name: "Vikram Singh",
      rating: 5,
      text: "High ROI, great brand value and continuous support. Couldn't have asked for a better franchise partner to grow with in this industry.",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      id: "suresh-kumar",
      name: "Suresh Kumar",
      rating: 5,
      text: "RP8 ke saath partner banna best decision tha, unka business model kaafi solid hai aur breakeven bhi expected time se pehle ho gaya.",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "deepika-nair",
      name: "Deepika Nair",
      rating: 5,
      text: "The brand recognition alone brings in walk-in members every week. Marketing support from the head office has been extremely helpful.",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "amit-trivedi",
      name: "Amit Trivedi",
      rating: 4,
      text: "Setup process bahut smooth tha, unki team ne equipment se lekar staff training tak sab kuch handle kiya bina kisi delay ke.",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: "kavita-rao",
      name: "Kavita Rao",
      rating: 5,
      text: "Running a fitness business felt overwhelming until RP8 stepped in with a proven system that just works from day one.",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: "rajesh-iyer",
      name: "Rajesh Iyer",
      rating: 5,
      text: "Investment ROI is genuinely impressive, aur unka ongoing operational support means humein kabhi akela nahi feel hota business mein.",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "simran-kaur",
      name: "Simran Kaur",
      rating: 4,
      text: "Our location was chosen with real data and foot traffic analysis, which made all the difference in the first year of operations.",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "manoj-verma",
      name: "Manoj Verma",
      rating: 5,
      text: "Franchise agreement se lekar launch tak har step pe unki team available thi, kabhi bhi feel nahi hua ki hum akele struggle kar rahe hain.",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "priyanka-desai",
      name: "Priyanka Desai",
      rating: 5,
      text: "The training programs for our staff were thorough and the brand's reputation made hiring qualified trainers so much easier.",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: "arvind-menon",
      name: "Arvind Menon",
      rating: 5,
      text: "Revenue streams multiple hain, gym membership ke alawa cafe aur pickleball court bhi extra income generate karte hain consistently.",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    {
      id: "sunita-agarwal",
      name: "Sunita Agarwal",
      rating: 5,
      text: "Two years in and we are already planning our second RP8 outlet. The support system genuinely makes scaling feel achievable.",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    {
      id: "rohan-kapoor",
      name: "Rohan Kapoor",
      rating: 4,
      text: "German machines ki wajah se members bahut impressed hote hain, aur wahi hume competitors se clearly alag banata hai market mein.",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    {
      id: "meera-pillai",
      name: "Meera Pillai",
      rating: 5,
      text: "From marketing campaigns to local promotions, RP8 head office handles the heavy lifting so we can focus on member experience.",
      avatar: "https://i.pravatar.cc/150?img=21",
    },
    {
      id: "vivek-malhotra",
      name: "Vivek Malhotra",
      rating: 5,
      text: "Break even humara expected time se kaafi pehle hua, credit goes to unka proven business model aur strong local marketing support.",
      avatar: "https://i.pravatar.cc/150?img=22",
    },
    {
      id: "nisha-reddy",
      name: "Nisha Reddy",
      rating: 5,
      text: "Owning an RP8 franchise has been one of the best business decisions I've made, the community impact alone makes it worthwhile.",
      avatar: "https://i.pravatar.cc/150?img=23",
    },
  ],
};

export default function FranchiseReviewsSection() {
  return <ReviewsSection content={FRANCHISE_REVIEWS_CONTENT} />;
}
