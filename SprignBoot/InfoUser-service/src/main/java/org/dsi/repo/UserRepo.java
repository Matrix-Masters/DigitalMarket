package org.dsi.repo;

import org.dsi.entity.InfoUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepo extends JpaRepository<InfoUser,Long> {
	
	@Query(value="select * from info_user where email=:email",nativeQuery=true)
	InfoUser getUserByemail(String email);
	
	@Query(value="select * from info_user where id=:id",nativeQuery=true)
	InfoUser getUserById(Long id);
	
	@Query(value="select * from info_user where role=:role",nativeQuery=true)
	InfoUser GetSuppliers(String role);

	List<InfoUser> findByRole(String string);

}
