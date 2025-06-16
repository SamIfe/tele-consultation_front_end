
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, Phone, Clock, FileText } from "lucide-react";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ConsultationRoomProps {
  appointmentId: string;
  onConsultationEnd?: () => void;
}

const ConsultationRoom = ({ appointmentId, onConsultationEnd }: ConsultationRoomProps) => {
  const [consultation, setConsultation] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadAppointmentData();
    loadConsultationData();
  }, [appointmentId]);

  const loadAppointmentData = async () => {
    try {
      const appointmentData = await apiService.getAppointmentById(appointmentId);
      setAppointment(appointmentData);
    } catch (error) {
      console.error('Failed to load appointment:', error);
    }
  };

  const loadConsultationData = async () => {
    try {
      const consultationData = await apiService.getConsultationByAppointment(appointmentId);
      setConsultation(consultationData);
    } catch (error) {
      console.error('No consultation found for this appointment');
    }
  };

  const startConsultation = async () => {
    setIsStarting(true);
    try {
      if (!consultation) {
        // Create consultation first
        const newConsultation = await apiService.createConsultation({
          appointmentId,
          doctorId: appointment.doctorId,
          patientId: appointment.patientId,
        });
        setConsultation(newConsultation);
        
        // Then start it
        await apiService.startConsultation(newConsultation._id);
      } else {
        await apiService.startConsultation(consultation._id);
      }
      
      loadConsultationData();
      toast({
        title: "Consultation started",
        description: "The consultation session has begun.",
      });
    } catch (error) {
      toast({
        title: "Failed to start consultation",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStarting(false);
    }
  };

  const endConsultation = async () => {
    setIsEnding(true);
    try {
      await apiService.endConsultation(consultation._id, notes);
      loadConsultationData();
      toast({
        title: "Consultation ended",
        description: "The consultation has been completed successfully.",
      });
      onConsultationEnd?.();
    } catch (error) {
      toast({
        title: "Failed to end consultation",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnding(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!appointment) {
    return <div>Loading appointment details...</div>;
  }

  const isDoctor = user?.role === 'doctor';
  const canStartEnd = isDoctor && user?.id === appointment.doctorId;
  const isActive = consultation?.status === 'active';
  const isCompleted = consultation?.status === 'completed';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Consultation Room</CardTitle>
              <CardDescription>
                Appointment with {isDoctor ? appointment.patientName : appointment.doctorName}
              </CardDescription>
            </div>
            {consultation && (
              <Badge className={getStatusColor(consultation.status)}>
                {consultation.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {isDoctor 
                    ? appointment.patientName?.split(' ').map((n: string) => n[0]).join('') 
                    : appointment.doctorName?.split(' ').map((n: string) => n[0]).join('')
                  }
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {isDoctor ? appointment.patientName : appointment.doctorName}
                </h3>
                <p className="text-sm text-gray-600">
                  {isDoctor ? 'Patient' : appointment.doctorSpecialization}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{appointment.date} at {appointment.time}</span>
            </div>
          </div>

          {!consultation && canStartEnd && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Ready to start the consultation?</p>
              <Button onClick={startConsultation} disabled={isStarting}>
                {isStarting ? "Starting..." : "Start Consultation"}
              </Button>
            </div>
          )}

          {consultation && !isActive && !isCompleted && canStartEnd && (
            <div className="text-center py-4">
              <Button onClick={startConsultation} disabled={isStarting}>
                {isStarting ? "Starting..." : "Start Consultation"}
              </Button>
            </div>
          )}

          {isActive && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Video className="h-5 w-5" />
                  <span className="font-medium">Consultation in progress</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Started at {new Date(consultation.startTime).toLocaleTimeString()}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Video className="h-5 w-5 mr-2" />
                  Video Call
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="h-5 w-5 mr-2" />
                  Audio Call
                </Button>
              </div>

              {canStartEnd && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Consultation Notes</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about the consultation..."
                      className="h-24"
                    />
                  </div>
                  <Button 
                    onClick={endConsultation} 
                    disabled={isEnding}
                    variant="destructive"
                    className="w-full"
                  >
                    {isEnding ? "Ending..." : "End Consultation"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {isCompleted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Consultation Completed</span>
              </div>
              <p className="text-sm text-blue-700">
                Duration: {consultation.startTime && consultation.endTime ? 
                  Math.round((new Date(consultation.endTime).getTime() - new Date(consultation.startTime).getTime()) / 60000) 
                  : 'N/A'} minutes
              </p>
              {consultation.notes && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-blue-800">Doctor's Notes:</p>
                  <p className="text-sm text-blue-700 mt-1">{consultation.notes}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationRoom;
