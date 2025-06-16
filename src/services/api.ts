
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Auth endpoints
  async register(userData: any) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  // Doctor endpoints
  async searchDoctors(params?: { specialization?: string; name?: string; location?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.name) queryParams.append('name', params.name);
    if (params?.location) queryParams.append('location', params.location);
    
    const response = await fetch(`${API_BASE_URL}/api/doctors?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getDoctorById(doctorId: string) {
    const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getDoctorReviews(doctorId: string) {
    const response = await fetch(`${API_BASE_URL}/api/doctors/${doctorId}/reviews`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Appointment endpoints
  async bookAppointment(appointmentData: any) {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(appointmentData),
    });
    return response.json();
  }

  async getAppointmentById(appointmentId: string) {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async updateAppointmentStatus(appointmentId: string, status: string) {
    const response = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  async getPatientAppointments() {
    const response = await fetch(`${API_BASE_URL}/api/appointments/patient/me`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getDoctorAppointments() {
    const response = await fetch(`${API_BASE_URL}/api/appointments/doctor/me`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async checkAvailability(doctorId: string, date: string) {
    const response = await fetch(`${API_BASE_URL}/api/appointments/availability?doctorId=${doctorId}&date=${date}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Consultation endpoints
  async createConsultation(consultationData: any) {
    const response = await fetch(`${API_BASE_URL}/api/consultations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(consultationData),
    });
    return response.json();
  }

  async startConsultation(consultationId: string) {
    const response = await fetch(`${API_BASE_URL}/api/consultations/${consultationId}/start`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async endConsultation(consultationId: string, notes?: string) {
    const response = await fetch(`${API_BASE_URL}/api/consultations/${consultationId}/end`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ notes }),
    });
    return response.json();
  }

  async getConsultationById(consultationId: string) {
    const response = await fetch(`${API_BASE_URL}/api/consultations/${consultationId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getConsultationByAppointment(appointmentId: string) {
    const response = await fetch(`${API_BASE_URL}/api/consultations/appointment/${appointmentId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Payment endpoints
  async createPayment(paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/api/payments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    return response.json();
  }

  async verifyPayment(paymentData: any) {
    const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(paymentData),
    });
    return response.json();
  }

  async getPaymentById(paymentId: string) {
    const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getPaymentsByAppointment(appointmentId: string) {
    const response = await fetch(`${API_BASE_URL}/api/payments/appointment/${appointmentId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Review endpoints
  async createReview(reviewData: any) {
    const response = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return response.json();
  }

  async getReviewById(reviewId: string) {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${reviewId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  // Medical Records endpoints
  async uploadMedicalRecord(formData: FormData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/medical-records`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return response.json();
  }

  async getPatientMedicalRecords() {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/me`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async getMedicalRecordById(recordId: string) {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/${recordId}`, {
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }

  async deleteMedicalRecord(recordId: string) {
    const response = await fetch(`${API_BASE_URL}/api/medical-records/${recordId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return response.json();
  }
}

export const apiService = new ApiService();
