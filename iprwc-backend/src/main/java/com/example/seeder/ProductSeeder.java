package com.example.seeder;

import com.example.models.Category;
import com.example.models.Product;
import com.example.services.CategoryService;
import com.example.services.ProductService;
import com.example.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
@Order(2)
public class ProductSeeder implements CommandLineRunner {

    private final ProductService productService;
    private final CategoryService categoryService;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            seedBlikjesProducts();
            log.info("Finished seeding products");
        }
    }

    private void seedBlikjesProducts() {
        Category RedBullCategory = categoryService.getCategoryByName("Red Bull").orElse(null);
        Category MonsterCategory = categoryService.getCategoryByName("Monster").orElse(null);

        List<Product> blikjes = Arrays.asList(
                new Product("Red Bull Bloesem", 2.00, 50, "Red Bull", "https://i.ibb.co/KpG7RgzS/redbull-bloesem.jpg", RedBullCategory),
                        new Product("Red Bull Watermelon", 2.00, 50, "Red Bull", "https://ibb.co/TBgqTdhv/redbull-watermelon.jpg", RedBullCategory),
                        new Product("Red Bull Tropical", 2.00, 50, "Red Bull", "https://ibb.co/whWYXj7D/redbull-tropical.jpg", RedBullCategory),
                        new Product("Red Bull Apricot", 2.00, 50, "Red Bull", "https://ibb.co/271LFRJP/redbull-apricot.jpg", RedBullCategory),
                        new Product("Red Bull Cactus", 2.00, 50, "Red Bull", "https://ibb.co/h1ZV85ym/redbull-cactus.jpg", RedBullCategory),
                        new Product("Red Bull Juneberry", 2.00, 50, "Red Bull", "https://ibb.co/7JHjDk0K/redbull-juneberry.jpg", RedBullCategory),
                        new Product("Monster Zero", 3.00, 100, "Monster", "https://ibb.co/Wv7qrcmK/monster-zero.jpg", MonsterCategory),
                        new Product("Monster Mango", 3.00, 100, "Monster", "https://ibb.co/BH9XG3wW/monster-mango.jpg", MonsterCategory),
                        new Product("Monster Gold", 3.00, 100, "Monster", "https://ibb.co/Q7XsJrm8/monster-gold.jpg", MonsterCategory)
        );

        for (Product product : blikjes) {
            productService.createProduct(product);
        }
    }
}