package org.dsi.repo;

import org.dsi.entity.InfoUser;

import java.sql.Timestamp;
import java.util.Date;
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
	
	@Query(value="SELECT * FROM info_user u WHERE " +
	        "(:search is null OR u.first_name LIKE %:search% OR u.last_name LIKE %:search% OR u.email LIKE %:search%) " +
	        "AND (:status is null OR (:status = 3 AND u.status = u.status) OR u.status = :status) " +
	        "AND (:date is null OR u.created_at <= :date)"+
	        "and (role='Supplier')", nativeQuery=true)
    List<InfoUser> findFilteredSuppliers(String search, int status,Timestamp date);
	
	@Query(value="SELECT * from info_user where role='Admin technique' OR role='Admin organisateur' OR role='Admin commande' OR role='livreur'",nativeQuery=true)
	List<InfoUser> GetAllEmployees();
}
