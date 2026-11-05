package com.data.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.data.entity.User;



@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	public Optional<User> findByUsername(String username);
	//at registration time, it check is usename is duplicate or not
	//at login time, it check username exists in db or not. if exist then valid user.
}
