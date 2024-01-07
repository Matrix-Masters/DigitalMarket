package org.dsi.security;

import java.util.Optional;

import org.dsi.entity.InfoUser;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsImpl implements UserDetailsService {

	@Autowired
	UserRepo userRep;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			Optional<InfoUser> user=userRep.findByEmail(username);
			if(user==null) {
				throw new UsernameNotFoundException("User Not Found");
			}
			return user.map(MyUserDetails::new).get();
	}

}