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
	
    @Query(value="SELECT u FROM InfoUser u WHERE " +
            "(:search is null OR u.FirstName LIKE %:search% OR u.LastName LIKE %:search% OR u.Email LIKE %:search%) " +
            "AND (:status is null OR u.status = :status) " +
            "AND (:date is null OR u.created_at <= :date)"+
            "and (role=Supplier",nativeQuery=true)
    List<InfoUser> findFilteredSuppliers(String search, int status,Timestamp date);

}
