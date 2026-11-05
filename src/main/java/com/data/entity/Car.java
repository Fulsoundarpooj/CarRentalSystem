package com.data.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String carName;
    private String brand;
    private double pricePerDay;
    private boolean available = true;

    private String fuelType;
    private String transmission;
    private int seats;
    private int modelYear;
    private double rating;
    private String imageUrl;

    @Column(length = 500)
    private String features;

    public Car() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCarName() { return carName; }
    public void setCarName(String carName) { this.carName = carName; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public int getSeats() { return seats; }
    public void setSeats(int seats) { this.seats = seats; }

    public int getModelYear() { return modelYear; }
    public void setModelYear(int modelYear) { this.modelYear = modelYear; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}
