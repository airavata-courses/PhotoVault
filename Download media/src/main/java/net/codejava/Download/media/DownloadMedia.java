package net.codejava.Download.media;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import net.codejava.Download.media.MediaRepository;


@RestController
public class DownloadMedia {
	
	public DownloadMedia()
	{
		
	}
	
	@Autowired
	private MediaRepository mediaRepository;
	
	@RequestMapping(value = "/download", method=RequestMethod.GET, params="fileId")
	@CrossOrigin
	public String download(String fileId) {

		String json = new Gson().toJson(mediaRepository.findById(fileId));
		return json;
		
//		List <Media> medias = new ArrayList<>();
//		mediaRepository.findAll().forEach(medias::add);
//		String json = new Gson().toJson(medias );
//		for (Media media:medias)
//		{
//			System.out.println(media.downloadLink);
//		}
//		return json;
	}
}
