package com.data.controller;

import com.data.entity.Car;
import com.data.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend calls
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping("/add")
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }

    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with ID : " + id));
    }

//    @PutMapping("/updateAvailability/{id}")
//    public Car updateAvailability(@PathVariable Long id,
//                                  @RequestParam boolean available) {
//        return carService.updateAvailability(id, available);
//    }

    @GetMapping("/brand/{brand}")
    public List<Car> getByBrand(@PathVariable String brand) {
        return carService.getCarsByBrand(brand);
    }

    @GetMapping("/fuel/{fuel}")
    public List<Car> getByFuel(@PathVariable String fuel) {
        return carService.getCarsByFuel(fuel);
    }

    @GetMapping("/price/{min}/{max}")
    public List<Car> getByPrice(@PathVariable double min,
                                @PathVariable double max) {
        return carService.getCarsByPriceRange(min, max);
    }
    
    @PutMapping("/availability/{id}")
    public void updateAvailability(@PathVariable Long id, @RequestParam boolean available) {
    	carService.updateCarAvailability(id, available);
    }

}
