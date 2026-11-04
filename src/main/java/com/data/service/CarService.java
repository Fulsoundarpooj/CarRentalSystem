package com.data.service;

import com.data.entity.Car;
import com.data.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    public CarRepository carRepository;

    // Add Car
    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    // Get all cars
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Get car by ID
    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    // Update car availability (true/false)
    public void updateCarAvailability(Long carId, boolean status) {
        Optional<Car> carOpt = carRepository.findById(carId);
        if (carOpt.isPresent()) {
            Car car = carOpt.get();
            car.setAvailable(status);
            carRepository.save(car);
        }
    }
    
    

    // Filter cars by brand
    public List<Car> getCarsByBrand(String brand) {
        return carRepository.findByBrandIgnoreCase(brand);
    }

    // Filter cars by fuel type
    public List<Car> getCarsByFuel(String fuelType) {
        return carRepository.findByFuelTypeIgnoreCase(fuelType);
    }

    // Filter cars by price range
    public List<Car> getCarsByPriceRange(double min, double max) {
        return carRepository.findByPricePerDayBetween(min, max);
    }
}
