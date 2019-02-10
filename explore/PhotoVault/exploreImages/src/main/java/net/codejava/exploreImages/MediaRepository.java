package net.codejava.exploreImages;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends MongoRepository<Media, String> {
	
//    public List<Media> findByName(String name);
	
	@Query(value = "{isPublic:?0}")
	List<Media> getPublicMedia(Boolean isPublic);

} 

