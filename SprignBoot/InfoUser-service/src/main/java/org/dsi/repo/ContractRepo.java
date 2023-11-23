package org.dsi.repo;

import org.dsi.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepo extends JpaRepository<Contract, Long> {

}
