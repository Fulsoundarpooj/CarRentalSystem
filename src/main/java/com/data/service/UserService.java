package com.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.data.entity.User;
import com.data.repository.UserRepository;



@Service
public class UserService {

	@Autowired
	UserRepository userrepo;
	
public String register(User u)
{
	//check for duplicate username
	User existinguser=userrepo.findByUsername(u.getUsername()).orElse(null);
	if(existinguser!=null)
	{
		return "please enter another username.This is one is already exists";
	}
	else {
		userrepo.save(u);
		return "Your registration completed sucessfully";
	}
}
	
public User login(String username,String password)
	
{
	User existinguser=userrepo.findByUsername(username).orElse(null);
	if(existinguser!=null)
	{
		if(existinguser.getPassword().equals(password))
		{
			return existinguser;
		}
	}
	
return null;
}
}
