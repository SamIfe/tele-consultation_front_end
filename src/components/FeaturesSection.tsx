
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
      title: "User Authentication",
      description: "Secure registration and login for patients, doctors, and admins with JWT tokens",
      endpoints: ["POST /api/auth/register", "POST /api/auth/login"],
      badge: "Auth"
    },
    {
      icon: Calendar,
      title: "Appointment Management",
      description: "Book, view, and manage appointments with availability checking",
      endpoints: ["POST /api/appointments", "GET /api/appointments/:id", "PUT /api/appointments/:id/status"],
      badge: "Scheduling"
    },
    {
      icon: Video,
      title: "Consultations",
      description: "Start, end, and retrieve consultation details with doctor controls",
      endpoints: ["POST /api/consultations", "PUT /api/consultations/:id/start", "PUT /api/consultations/:id/end"],
      badge: "Telemedicine"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Create and verify payments for appointments securely",
      endpoints: ["POST /api/payments", "POST /api/payments/verify", "GET /api/payments/:id"],
      badge: "Payments"
    },
    {
      icon: Star,
      title: "Review System",
      description: "Patients can review doctors and view ratings",
      endpoints: ["POST /api/reviews", "GET /api/reviews/doctor/:id", "GET /api/reviews/:id"],
      badge: "Reviews"
    },
    {
      icon: FileText,
      title: "Medical Records",
      description: "Upload, view, and manage medical records with file support",
      endpoints: ["POST /api/medical-records", "GET /api/medical-records/me", "DELETE /api/medical-records/:id"],
      badge: "Records"
    },
    {
      icon: Database,
      title: "Doctor Management",
      description: "Search, create, and update doctor profiles with specializations",
      endpoints: ["GET /api/doctors", "POST /api/doctors", "PUT /api/doctors/:id"],
      badge: "Profiles"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure endpoints with different access levels for each user role",
      endpoints: ["JWT Authentication", "Role Validation", "Access Control"],
      badge: "Security"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Comprehensive API Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our backend API provides all the essential features needed for a complete telemedicine platform
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
                <h4 className="text-sm font-medium text-gray-700">API Endpoints:</h4>
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
