package com.data.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.data.entity.Booking;
import com.data.entity.Car;
import com.data.repository.BookingRepository;
import com.data.repository.CarRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repo;
    
    @Autowired
   public  CarRepository CarRepository;

    @Autowired
    private CarService carService; // Inject CarService

    public Booking createBooking(Booking booking) {
        booking.setStatus("Pending");
        //booking.setPaymentStatus("");

        Booking savedBooking = repo.save(booking);

        // Set car as unavailable
        carService.updateCarAvailability(booking.getCarId(), false);

        return savedBooking;
    }

    public List<Booking> getAllBookings() {
//    	
//    	List<Booking>reqlist= repo.findAll();
//    	List<Booking> filteredList = new ArrayList<>();
//
//        for (Booking b : reqlist) {
//        	
//        	Optional<Car> carinfo = CarRepository.findById(b.getCarId());
//            if(carinfo!=null) {
//        
//        	  b.setcarname(carinfo.get().getCarName());
//                filteredList.add(b);
//            } 
//        }
//
//        return filteredList;
                
        //return repo.findAll();
    
    List<Booking> reqlist = repo.findAll();
    List<Booking> filteredList = new ArrayList<>();

    for (Booking b : reqlist) {

        if (b.getCarId() == null) continue;

        Optional<Car> carinfo = CarRepository.findById(b.getCarId());

        carinfo.ifPresent(car -> {
            b.setcarname(car.getCarName());
            filteredList.add(b);
        });
    }

    return filteredList;
    }
    
    
    public void updateBooking(Long bookingId) {
        Optional<Booking> booking = repo.findById(bookingId);
        if (booking.isPresent()) {
            Booking currentbooking = booking.get();
            currentbooking.setStatus("CONFIRMED");
            repo.save(currentbooking);
        }
    }
    
    public List<Booking> getAllRequestedBookings() {
    	
    	List<Booking>reqlist= repo.findAll();
    	List<Booking> filteredList = new ArrayList<>();

        for (Booking b : reqlist) {
            if (b.getIsReqSubmitted() && b.getStatus().equals("Pending")) {   // check boolean flag
                filteredList.add(b);
            }
        }

        return filteredList;
                
        
    }
    
    
    public List<Booking> getBookingsByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public Optional<Booking> getBookingById(Long id) {
        return repo.findById(id);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        Optional<Booking> existing = repo.findById(id);
        if (existing.isPresent()) {
            Booking booking = existing.get();
            booking.setStartDate(updatedBooking.getStartDate());
            booking.setEndDate(updatedBooking.getEndDate());
            booking.setTotalAmount(updatedBooking.getTotalAmount());
            booking.setPaymentMode(updatedBooking.getPaymentMode());
            booking.setPaymentStatus(updatedBooking.getPaymentStatus());
            booking.setStatus(updatedBooking.getStatus());
            booking.setInvoicePath(updatedBooking.getInvoicePath());
            booking.setCustomerName(updatedBooking.getCustomerName());
            booking.setCustomerMobile(updatedBooking.getCustomerMobile());
            

            Booking updated = repo.save(booking);

            // If status changed to CANCELLED -> make car available again
            if (updatedBooking.getStatus().equalsIgnoreCase("CANCELLED")) {
                carService.updateCarAvailability(updatedBooking.getCarId(), true);
            }

            return updated;
        }
        return null;
    }

    public void deleteBooking(Long id) {
        repo.deleteById(id);
    }
}




//package com.data.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.data.entity.Booking;
//import com.data.repository.BookingRepository;
//
//@Service
//public class BookingService {
//
//    @Autowired
//    private BookingRepository repo;
//
//    @Autowired
//    private CarService carService;
//
//    // 1️⃣ User creates booking
//    public Booking createBooking(Booking booking) {
//        booking.setStatus("PENDING");       // Admin must verify docs
//        booking.setPaymentStatus("UNPAID"); // Payment later when approved
//        booking.setIsApproved(false);
//        booking.setIsReqSubmitted(false);
//        return repo.save(booking);
//    }
//
//    // 2️⃣ Fetch all bookings (Admin)
//    public List<Booking> getAllBookings() {
//        return repo.findAll();
//    }
//
//    // 3️⃣ Fetch bookings by user
//    public List<Booking> getBookingsByUser(Long userId) {
//        return repo.findByUserId(userId);
//    }
//
//    // 4️⃣ Approve booking (Admin)
//    public Booking approveBooking(Long id) {
//        Booking booking = repo.findById(id).orElse(null);
//        if (booking == null) return null;
//
//        booking.setStatus("APPROVED");
//        booking.setIsApproved(true);
//
//        Booking updated = repo.save(booking);
//
//        // Mark car unavailable only after approval
//        carService.updateCarAvailability(updated.getCarId(), false);
//
//        return updated;
//    }
//
//    // 5️⃣ Reject booking (Admin)
//    public Booking rejectBooking(Long id) {
//        Booking booking = repo.findById(id).orElse(null);
//        if (booking == null) return null;
//
//        booking.setStatus("REJECTED");
//        booking.setIsApproved(false);
//
//        Booking updated = repo.save(booking);
//
//        // Car should be available again
//        carService.updateCarAvailability(updated.getCarId(), true);
//
//        return updated;
//    }
//
//    // 6️⃣ User completes payment
//    public Booking updatePayment(Long id, String paymentMode) {
//        Booking booking = repo.findById(id).orElse(null);
//        if (booking == null) return null;
//
//        booking.setPaymentMode(paymentMode);
//        booking.setPaymentStatus("PAID");
//
//        return repo.save(booking);
//    }
//
//    // 7️⃣ Delete booking → Car should become available again
//    public void deleteBooking(Long id) {
//        Booking booking = repo.findById(id).orElse(null);
//        if (booking != null) {
//            carService.updateCarAvailability(booking.getCarId(), true);
//        }
//        repo.deleteById(id);
//    }
//
//    // 8️⃣ Upload documents for verification
//    public Booking uploadDocs(Long id, byte[] idProof, byte[] dl) {
//        Booking booking = repo.findById(id).orElse(null);
//        if (booking == null) return null;
//
//        booking.setIdentityProof(idProof);
//        booking.setDrivingLicense(dl);
//        booking.setIsReqSubmitted(true);
//        booking.setStatus("REVIEWING");
//
//        return repo.save(booking);
//    }
//}
//
