package com.data.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long carId;

    private LocalDate startDate;
    private LocalDate endDate;

    private double totalAmount;

    private String paymentMode; // ONLINE / OFFLINE / UPI
    private String paymentStatus; // PENDING / PAID / FAILED

    private String status; // CREATED / APPROVED / REJECTED / CANCELLED
    private String carname;
    private String invoicePath;
    public boolean isReqSubmitted ;
    // NEW FIELDS
    private String customerName;
    private String customerMobile;

    public Booking() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getcarname() { return carname; }
    public void setcarname(String carname) { this.carname = carname; }

    public String getInvoicePath() { return invoicePath; }
    public void setInvoicePath(String invoicePath) { this.invoicePath = invoicePath; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerMobile() { return customerMobile; }
    public void setCustomerMobile(String customerMobile) { this.customerMobile = customerMobile; }
    
    public boolean getIsReqSubmitted() { return isReqSubmitted; }
    public void setIsReqSubmitted(boolean isReqSubmitted) { this.isReqSubmitted = isReqSubmitted; }

}