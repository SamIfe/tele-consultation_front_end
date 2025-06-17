
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Video, 
  CreditCard, 
  Star, 
  FileText, 
  Shield, 
  Database 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "User – You Are at the Heart of Everything We Do",
      description: "We tailor every interaction to your needs, because your health journey is unique.",
      endpoints: ["Supportive Community: You're not just a user — you're family. We're here for you every step.", "Easy-to-Use Interface: Designed with simplicity in mind so you feel confident and in control."],
      badge: "User"
    },
    {
      icon: Calendar,
      title: "Appointment – Because Your Time is Precious",
      description: "Book, view, and manage appointments with availability checking",
      endpoints: ["Flexible Scheduling", "Instant Confirmations", "Reschedule with Ease"],
      badge: "Scheduling"
    },
    {
      icon: Video,
      title: "Consultation – Talk, Be Heard, Get Help",
      description: "Meet experienced doctors virtually from anywhere",
      endpoints: ["Face-to-Face with Experts", "Zero Judgment Zone "],
      badge: "Telemedicine"
    },
    {
      icon: CreditCard,
      title: "Affordable Medical Fee – Quality Care Within Reach",
      description: "World-class care, without breaking the bank.",
      endpoints: ["Transparent Pricing", "Flexible Payment Options", "Value-Packed Services"],
      badge: "Payments"
    },
    {
      icon: Star,
      title: "Review System",
      description: "Patients can review doctors and view ratings",
      endpoints: ["Patient Reviews", "Doctor Ratings", "Feedback Mechanism"],
      badge: "Reviews"
    },
    {
      icon: FileText,
      title: "Seamless Medical Record – One Tap Access, Always",
      description: "Your records are with you, whenever you need them.",
      endpoints: ["Smart Tracking", "All-in-One Health History", "Accessible Anytime, Anywhere"],
      badge: "Records"
    },
    {
      icon: Database,
      title: "Doctor Availability",
      description: "From general care to specialists, all in one app.",
      endpoints: ["On-Demand Consultations", "Wide Specialty Access", "Consistent Care Team"],
      badge: "Profiles"
    },
    {
      icon: Shield,
      title: "Security – Your Privacy is Sacred",
      description: "We uphold the highest health data protection standards.",
      endpoints: ["You Control Access", "HIPAA-Compliant Standards", "End-to-End Encryption"],
      badge: "Security"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Prioritizing Your Healthcare Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform has been thoughtfully designed to place you at the center of everything we do, ensuring that every interaction reflects our commitment to making you feel valued, supported, and genuinely cared for.
           </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <feature.icon className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                <Badge variant="secondary">{feature.badge}</Badge>
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-gray-700"></h4>
                {feature.endpoints.map((endpoint, idx) => (
                  <code key={idx} className="block text-xs bg-gray-100 p-1 rounded text-gray-600">
                    {endpoint}
                  </code>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
