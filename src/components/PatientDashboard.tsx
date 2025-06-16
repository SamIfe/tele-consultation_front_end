
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  FileText, 
  Clock, 
  Star, 
  Download, 
  Upload, 
  Eye,
  Video,
  Phone,
  CreditCard
} from "lucide-react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-06-18",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "confirmed",
      fee: 150
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-06-20",
      time: "02:00 PM",
      type: "Follow-up",
      status: "pending",
      fee: 120
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      date: "2024-06-10",
      time: "11:00 AM",
      type: "General Consultation",
      status: "completed",
      fee: 100,
      rating: 5
    }
  ];

  const medicalRecords = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "2024-06-10",
      doctor: "Dr. Emily Rodriguez",
      type: "Lab Report",
      size: "2.3 MB"
    },
    {
      id: 2,
      title: "X-Ray Chest",
      date: "2024-05-28",
      doctor: "Dr. James Wilson",
      type: "Imaging",
      size: "5.7 MB"
    },
    {
      id: 3,
      title: "Prescription",
      date: "2024-06-10",
      doctor: "Dr. Emily Rodriguez",
      type: "Prescription",
      size: "0.5 MB"
    }
  ];

  const payments = [
    {
      id: 1,
      amount: 100,
      date: "2024-06-10",
      doctor: "Dr. Emily Rodriguez",
      status: "paid",
      method: "Credit Card"
    },
    {
      id: 2,
      amount: 150,
      date: "2024-06-18",
      doctor: "Dr. Sarah Johnson",
      status: "pending",
      method: "Credit Card"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "paid": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Dashboard</CardTitle>
          <CardDescription>
            Manage your appointments, medical records, and health information
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {appointment.doctor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{appointment.doctor}</h4>
                        <p className="text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{appointment.date} at {appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ${appointment.fee}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <h3 className="text-lg font-semibold mt-6">Past Appointments</h3>
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {appointment.doctor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{appointment.doctor}</h4>
                        <p className="text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{appointment.date} at {appointment.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < (appointment.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Medical Records</h3>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Record
            </Button>
          </div>
          
          <div className="grid gap-4">
            {medicalRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{record.title}</h4>
                        <p className="text-gray-600">{record.doctor}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{record.date}</span>
                          <Badge variant="secondary">{record.type}</Badge>
                          <span>{record.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold">Consultation Fee</h4>
                        <p className="text-gray-600">{payment.doctor}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{payment.date}</span>
                          <span>{payment.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${payment.amount}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <h3 className="text-lg font-semibold">Your Reviews</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">Dr. Emily Rodriguez</h4>
                  <p className="text-gray-600">Pediatrics</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Excellent doctor! Very professional and caring. Explained everything clearly.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Reviewed on June 10, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
