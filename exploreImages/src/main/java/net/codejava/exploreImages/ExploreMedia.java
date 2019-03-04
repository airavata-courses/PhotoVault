package net.codejava.exploreImages;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import net.codejava.exploreImages.MediaRepository;


@RestController
public class ExploreMedia {
	
	public ExploreMedia()
	{
		
	}
	
	@Autowired
	private MediaRepository mediaRepository;
	
//	@RequestMapping(value = "/explore", method = RequestMethod.GET, params = "accessRights" )
//	@CrossOrigin
//	public String explore(String accessRights) {
//		
//		String json = new Gson().toJson(mediaRepository.getPublicMedia(accessRights));
//
////		String json = new Gson().toJson(mediaRepository.findById(fileId));
//		System.out.println("Hi");
//		System.out.println("Json returns = " + json);
//		return json;
//		
////		List <Media> medias = new ArrayList<>();
////		mediaRepository.findAll().forEach(medias::add);
////		String json = new Gson().toJson(medias );
////		for (Media media:medias)
////		{
////			System.out.println(media.downloadLink);
////		}
////		return json;
//	}
	
		@GetMapping("/health")
		@CrossOrigin
		public String getHealth(){
			return "yo its working";
		}


	@GetMapping("/explore/{isPublic}")
	@CrossOrigin
	public String explore1(@PathVariable("isPublic") Boolean isPublic) 
	{
//		String json = new Gson().toJson(this.mediaRepository.getPublicMedia(accessRights));
		List <Media> media = this.mediaRepository.getPublicMedia(isPublic);
		String json = new Gson().toJson(media);
//		System.out.println("Hi");
		System.out.println("Json returns = " + json);
		return json;
	}
}
