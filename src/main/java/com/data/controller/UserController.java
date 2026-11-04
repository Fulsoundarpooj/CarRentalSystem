package com.data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DTO.UserDTO;
import com.data.entity.User;
import com.data.service.UserService;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {

	@Autowired
	UserService uservice;
	
	@PostMapping("/register")
	public String userregister(@RequestBody User u)
	{
		return uservice.register(u);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserDTO userdto) 
	{
		if(userdto.getUsername().equals("admin")&& userdto.getPassword().equals("admin@1234"))
		{
			User adminuser= new User();
			
			adminuser.setUsername("admin");
			adminuser.setPassword("admin@1234");
			adminuser.setUrole("Admin");
			return ResponseEntity.ok(adminuser);
		}
		else
		{
				//2. else, normal user login
		User u = uservice.login(userdto.getUsername(),userdto.getPassword());
		if(u!=null) {
			return ResponseEntity.ok(u);
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("Invalid username or password");
		}
	}
	}
}
