package net.codejava.exploreImages;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
//import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableConfigurationProperties
@EnableDiscoveryClient
@EnableAutoConfiguration
@SpringBootApplication//(exclude = {MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
public class ExploreImagesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExploreImagesApplication.class, args);
	}

}

