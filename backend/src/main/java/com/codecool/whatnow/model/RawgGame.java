package com.codecool.whatnow.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class RawgGame {

    private int id;

    private String name;

    @JsonProperty("background_image")
    private String backgroundImage;

    private double rating;

    private List<PlatformWrapper> platforms;

    private List<Genre> genres;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public List<PlatformWrapper> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<PlatformWrapper> platforms) {
        this.platforms = platforms;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }


    public static class PlatformWrapper {
        private Platform platform;

        public Platform getPlatform() {
            return platform;
        }

        public void setPlatform(Platform platform) {
            this.platform = platform;
        }
    }

    public static class Platform {
        private int id;
        private String name;
        private String slug;

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
    }

    public static class Genre {
        private int id;
        private String name;
        private String slug;

        public int getId() { return id; }
        public void setId(int id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
    }
}
