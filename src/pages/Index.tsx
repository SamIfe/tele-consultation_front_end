
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Users, Shield, Star, Clock, Heart, Phone, Video, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DoctorSearch from "@/components/DoctorSearch";
import AppointmentBooking from "@/components/AppointmentBooking";
import PatientDashboard from "@/components/PatientDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Book Appointment</TabsTrigger>
            <TabsTrigger value="dashboard">Patient Dashboard</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-12">
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorSearch />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentBooking />
          </TabsContent>

          <TabsContent value="dashboard">
            <PatientDashboard />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { icon: Users, label: "Registered Doctors", value: "500+" },
    { icon: Calendar, label: "Appointments Completed", value: "10,000+" },
    { icon: Star, label: "Average Rating", value: "4.9/5" },
    { icon: Clock, label: "Average Response Time", value: "< 2 min" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <CardContent className="pt-6">
            <stat.icon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About ConsultCare</CardTitle>
          <CardDescription>
            Advanced telemedicine platform powered by comprehensive backend API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ConsultCare is a comprehensive telemedicine backend API built with Node.js, Express, and MongoDB. 
            Our platform supports the complete healthcare ecosystem with robust features for patients, doctors, and administrators.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Core Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  User Authentication & Authorization
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  Doctor & Patient Management
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  Appointment Scheduling
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-green-600" />
                  Video Consultations
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  Payment Processing
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-600" />
                  Review & Rating System
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  Medical Records Management
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Role-Based Access Control
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">API Endpoints</h4>
            <p className="text-blue-800 text-sm">
              Our RESTful API provides comprehensive endpoints for authentication, doctor management, 
              appointments, consultations, payments, reviews, and medical records - all secured with 
              JWT authentication and role-based access control.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
