package org.dsi.service;

import org.dsi.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommandationService {
	
	@Autowired
	RecommandationRepository recommandationRepository;

}
