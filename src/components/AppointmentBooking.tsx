import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, User, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: ""
  });
  const [doctors, setDoctors] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const doctors = [
    "Dr. Sarah Johnson - Cardiology",
    "Dr. Michael Chen - Dermatology", 
    "Dr. Emily Rodriguez - Pediatrics",
    "Dr. James Wilson - Neurology"
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const appointmentTypes = [
    "General Consultation",
    "Follow-up Visit",
    "Urgent Care",
    "Specialist Consultation"
  ];

  useEffect(() => {
    loadDoctors();
    if (user) {
      setPatientInfo(prev => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email || "",
        phone: user.phone || ""
      }));
    }
  }, [user]);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      checkAvailability();
    }
  }, [selectedDoctor, selectedDate]);

  const loadDoctors = async () => {
    try {
      const doctorsData = await apiService.searchDoctors();
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    }
  };

  const checkAvailability = async () => {
    if (!selectedDoctor || !selectedDate) return;
    
    try {
      const availability = await apiService.checkAvailability(
        selectedDoctor,
        format(selectedDate, 'yyyy-MM-dd')
      );
      setAvailableSlots(availability.availableSlots || timeSlots);
    } catch (error) {
      console.error('Failed to check availability:', error);
      setAvailableSlots(timeSlots);
    }
  };

  const handleBookAppointment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedTime || !appointmentType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);
    try {
      const appointmentData = {
        doctorId: selectedDoctor,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        type: appointmentType,
        symptoms: patientInfo.symptoms,
        patientInfo: {
          name: patientInfo.name,
          email: patientInfo.email,
          phone: patientInfo.phone
        }
      };

      const appointment = await apiService.bookAppointment(appointmentData);
      
      toast({
        title: "Appointment booked successfully!",
        description: "You will receive a confirmation email shortly.",
      });

      // Reset form
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedDoctor("");
      setAppointmentType("");
      setPatientInfo(prev => ({ ...prev, symptoms: "" }));
      
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const selectedDoctorData = doctors.find(doc => doc._id === selectedDoctor);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Book Your Appointment
          </CardTitle>
          <CardDescription>
            Schedule a consultation with our healthcare professionals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availableSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className="justify-center"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input 
                  id="patient-name" 
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name" 
                />
              </div>

              <div>
                <Label htmlFor="patient-email">Email Address</Label>
                <Input 
                  id="patient-email" 
                  type="email" 
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email" 
                />
              </div>

              <div>
                <Label htmlFor="patient-phone">Phone Number</Label>
                <Input 
                  id="patient-phone" 
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number" 
                />
              </div>

              <div>
                <Label htmlFor="symptoms">Symptoms/Reason for Visit</Label>
                <Textarea 
                  id="symptoms" 
                  value={patientInfo.symptoms}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, symptoms: e.target.value }))}
                  placeholder="Describe your symptoms or reason for the appointment..."
                  className="h-24"
                />
              </div>
            </div>
          </div>

          {selectedDoctorData && selectedDate && selectedTime && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Doctor:</span>
                  <span className="font-medium">
                    {selectedDoctorData.firstName} {selectedDoctorData.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Specialization:</span>
                  <span className="font-medium">{selectedDoctorData.specialization}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{selectedDate && format(selectedDate, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{appointmentType}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Consultation Fee:</span>
                  <span className="font-bold text-blue-600">
                    ${selectedDoctorData.consultationFee || 150}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleBookAppointment}
              disabled={isBooking}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {isBooking ? "Booking..." : "Book & Pay Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
