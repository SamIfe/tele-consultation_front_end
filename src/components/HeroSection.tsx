
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, Shield, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Healthcare at Your
          <span className="text-blue-600 block">Fingertips</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with certified doctors, book appointments, and manage your health records 
          all through our comprehensive telemedicine platform.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="mr-2 h-5 w-5" />
          Book Appointment
        </Button>
        <Button size="lg" variant="outline">
          <Video className="mr-2 h-5 w-5" />
          Start Consultation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">End-to-end encryption with HIPAA compliance</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">24/7 Available</h3>
            <p className="text-gray-600">Round-the-clock medical support</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 text-center">
            <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Consultations</h3>
            <p className="text-gray-600">High-quality video calls with doctors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;
