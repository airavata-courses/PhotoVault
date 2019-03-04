package net.codejava.exploreImages;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix="spring.cloud.consul.discovery")
public class AppProperties {
    private String ipAddress="149.165.168.210";

}
