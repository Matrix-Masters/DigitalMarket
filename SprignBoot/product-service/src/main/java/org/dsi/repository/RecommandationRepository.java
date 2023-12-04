package org.dsi.repository;

import org.dsi.entity.Recommandation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RecommandationRepository extends JpaRepository<Recommandation, Long>{

}
