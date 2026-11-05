package com.data.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.data.entity.Car;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findByBrandIgnoreCase(String brand);

    List<Car> findByFuelTypeIgnoreCase(String fuelType);

    List<Car> findByPricePerDayBetween(double minPrice, double maxPrice);
    List<Car> findByAvailable(boolean available);
    

}
