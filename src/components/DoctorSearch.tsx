
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Clock, Video, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Ifeoluwa O",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 127,
      experience: "15 years",
      location: "Yaba , Lagos",
      availability: "Available today",
      consultationFee: 95000,
      image: "../public/doc.jpg"
    },
    {
      id: 2,
      name: "Dr. Funmi Sanni",
      specialty: "Dermatology",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      location: "Badagry GRA, Lagos",
      availability: "Next available: Tomorrow",
      consultationFee: 120000,
      image: "../public/funmi.png"
    },
    {
      id: 3,
      name: "Kaleb Kasongo BamOkpa",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 203,
      experience: "18 years",
      location: "Ago Palace Way, Lagos",
      availability: "Available now",
      consultationFee: 1000,
      image: "../public/kasongo.jpg"
    },
    {
      id: 4,
      name: "Kimberly Kim",
      specialty: "Neurology",
      rating: 4.7,
      reviews: 156,
      experience: "20 years",
      location: "Iwaya, Yaba, Lagos",
      availability: "Available today",
      consultationFee: 200000,
      image: "../public/kim.png"
    },

    {
      id: 5,
      name: "Uwani  Freegift",
      specialty: "General Medicine",
      rating: 4.5,
      reviews: 157,
      experience: "21 years",
      location: "Lekki, Lagos",
      availability: "Available today",
      consultationFee: 200000,
      image: "../public/Uwani.png"
    }

  ];

  const specialties = ["Cardiology", "Dermatology", "Pediatrics", "Neurology", "General Medicine", "Psychiatry"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find the Right Doctor
          </CardTitle>
          <CardDescription>
            Search through our network of certified healthcare professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by doctor name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews})</span>
                    </div>
                    <Badge variant="secondary">{doctor.experience}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{doctor.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">{doctor.availability}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-blue-600">
                    ₦{doctor.consultationFee}
                  </span>
                  <span className="text-gray-500 ml-1">consultation</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Video className="h-4 w-4 mr-1" />
                    Video Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorSearch;
