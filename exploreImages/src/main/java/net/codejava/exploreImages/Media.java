package net.codejava.exploreImages;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
 
@Document(collection = "photovault_photomedia")
 
public class Media {
	
	@Id
	String fileId;
    String userId;
	String userEmail;
    String fileName;
    String src;
    String filePath;
    boolean isPublic;
    String caption;
    String hashtag;
    String size;
    String dateUpload;
    String location;
    String fileType;
    String thumbnail;
    int thumbnailWidth;
    int thumbnailHeight;
    
    public int getThumbnailWidth() {
		return thumbnailWidth;
	}

	public void setThumbnailWidth(int thumbnailWidth) {
		this.thumbnailWidth = thumbnailWidth;
	}

	public int getThumbnailHeight() {
		return thumbnailHeight;
	}

	public void setThumbnailHeight(int thumbnailHeight) {
		this.thumbnailHeight = thumbnailHeight;
	}

	public Media ()
    {
    	
    }
 
    public Media(String fileId) {
        this.fileId = fileId;
    }


	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public void setUserId(String userId) {
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

	public void setIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
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
