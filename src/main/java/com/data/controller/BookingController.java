package com.data.controller;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.data.entity.Booking;
import com.data.entity.Car;
import com.data.service.BookingService;
import com.data.service.CarService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService service;
    
    @Autowired
    private CarService carService;


    
    @PostMapping("/create")
    public Booking createBooking(@RequestBody Booking booking) {
        // 1️⃣ Save booking first
        Booking savedBooking = service.createBooking(booking);

        // 2️⃣ Mark the car as unavailable
        //carService.updateCarAvailability(booking.getCarId(), false);

        return savedBooking;
    }


    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }


    @GetMapping("/allRequestedBooking")
    public List<Booking> getAllRequestedBookings() {
        return service.getAllRequestedBookings();
    }

    
    @PostMapping("/confirmBooking")
    public String confirmBooking(@RequestBody Booking booking) {
        // 1️⃣ Save booking first
         service.updateBooking(booking.getId());

         //2️⃣ Mark the car as unavailable
        carService.updateCarAvailability(booking.getCarId(), false);

        return "Booking is APPROVED";
    }

   

    
    
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return service.getBookingsByUser(userId);
    }

    @GetMapping("/{id}")
    public Optional<Booking> getBookingById(@PathVariable Long id) {
        return service.getBookingById(id);
    }

    @PutMapping("/update/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        return service.updateBooking(id, booking);
    }

//    @DeleteMapping("/delete/{id}")
//    public String deleteBooking(@PathVariable Long id) {
//        service.deleteBooking(id);
//        return "Booking Deleted Successfully with ID: " + id;
//    }
    
    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        Optional<Booking> bookingOpt = service.getBookingById(id);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();

            // Make car available again
            carService.updateCarAvailability(booking.getCarId(), true);

            // Delete booking
            service.deleteBooking(id);
            return "Booking Deleted Successfully with ID: " + id;
        }
        return "Booking not found";
    }


    // Invoice Download
    @GetMapping("/invoice/{id}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable Long id) {
        Optional<Booking> bookingOpt = service.getBookingById(id);
        if (bookingOpt.isEmpty()) return ResponseEntity.notFound().build();

        Booking booking = bookingOpt.get();

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph("CAR RENTAL BOOKING INVOICE"));
            document.add(new Paragraph("-----------------------------------------------------"));
            document.add(new Paragraph("Booking ID: " + booking.getId()));
            document.add(new Paragraph("Customer Name: " + booking.getCustomerName()));
            document.add(new Paragraph("Mobile: " + booking.getCustomerMobile()));
            document.add(new Paragraph("Car ID: " + booking.getCarId()));
            document.add(new Paragraph("Start Date: " + booking.getStartDate()));
            document.add(new Paragraph("End Date: " + booking.getEndDate()));
            document.add(new Paragraph("Total Amount: ₹" + booking.getTotalAmount()));
            document.add(new Paragraph("Payment: " + booking.getPaymentMode() + " (" + booking.getPaymentStatus() + ")"));
            document.add(new Paragraph("Booking Status: " + booking.getStatus()));
            document.add(new Paragraph("-----------------------------------------------------"));

            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.set("Content-Disposition", "attachment; filename=invoice_" + booking.getId() + ".pdf");

            return new ResponseEntity<>(baos.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
 // Cancel booking endpoint
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        Optional<Booking> bookingOpt = service.getBookingById(id);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = bookingOpt.get();
        booking.setStatus("CANCELLED"); // mark as cancelled

        // This updates the booking and sets the car as available
        Booking updatedBooking = service.updateBooking(id, booking);

        return ResponseEntity.ok(updatedBooking);
    }

}

//package com.data.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.data.entity.Booking;
//import com.data.service.BookingService;
//
//@RestController
//@RequestMapping("/api/bookings")
//@CrossOrigin(origins = "http://localhost:3000")
//public class BookingController {
//
//    @Autowired
//    private BookingService service;
//
//    @PostMapping("/create")
//    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
//        return ResponseEntity.ok(service.createBooking(booking));
//    }
//
//    @PostMapping("/uploadDocs/{id}")
//    public ResponseEntity<Booking> uploadDocs(
//            @PathVariable Long id,
//            @RequestParam("identityProof") MultipartFile idProof,
//            @RequestParam("drivingLicense") MultipartFile dl) 
//    {
//        try {
//            Booking updated = service.uploadDocs(id, idProof.getBytes(), dl.getBytes());
//            if (updated == null) return ResponseEntity.notFound().build();
//            return ResponseEntity.ok(updated);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//    }
//    
//    @PutMapping("/pay/{id}")
//    public ResponseEntity<Booking> updatePayment(
//            @PathVariable Long id,
//            @RequestParam String paymentMode) // CASH / UPI / ONLINE
//    {
//        Booking updated = service.updatePayment(id, paymentMode);
//        if (updated == null)
//            return ResponseEntity.notFound().build();
//
//        return ResponseEntity.ok(updated);
//    }
//
//
//    @PutMapping("/approve/{id}")
//    public ResponseEntity<Booking> approve(@PathVariable Long id) {
//        return ResponseEntity.ok(service.approveBooking(id));
//    }
//
//    @PutMapping("/reject/{id}")
//    public ResponseEntity<Booking> reject(@PathVariable Long id) {
//        return ResponseEntity.ok(service.rejectBooking(id));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Booking>> getAll() {
//        return ResponseEntity.ok(service.getAllBookings());
//    }
//
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable Long userId) {
//        return ResponseEntity.ok(service.getBookingsByUser(userId));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
//        service.deleteBooking(id);
//        return ResponseEntity.noContent().build();
//    }
//}
//
