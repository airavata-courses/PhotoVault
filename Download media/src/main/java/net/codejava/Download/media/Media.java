package net.codejava.Download.media;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
 
@Document(collection = "photovault_photomedia")
 
public class Media {
	
	@Id
	String fileId;
    int userId;
	String userEmail;
    String fileName;
    String src;
    String filePath;
    String accessRights;
    String caption;
    String hashtag;
    String size;
    String dateUpload;
    String location;
    String fileType;
    String thumbnail;
    
    public Media ()
    {
    	
    }
 
    public Media(String fileId) {
        this.fileId = fileId;
    }


	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setDownloadLink(String downloadLink) {
		this.src = downloadLink;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public void setAccessRights(String accessRights) {
		this.accessRights = accessRights;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public void setHashtag(String hashtag) {
		this.hashtag = hashtag;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public void setDateUpload(String dateUpload) {
		this.dateUpload = dateUpload;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public void setThumbnailLink(String thumbnailLink) {
		this.thumbnail = thumbnailLink;
	}
}
