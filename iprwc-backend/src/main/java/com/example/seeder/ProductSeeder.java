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
                new Product("Red Bull Blossom", 2.00, 50, "Red Bull with blossom flavoring", "https://i.ibb.co/KpG7RgzS/redbull-bloesem.jpg", RedBullCategory),
                        new Product("Red Bull Watermelon", 2.00, 50, "Red Bull with watermelon flavoring", "https://i.ibb.co/ynQBR7sf/redbull-watermelon.jpg", RedBullCategory),
                        new Product("Red Bull Tropical", 2.00, 50, "Red Bull with tropical fruit flavoring", "https://i.ibb.co/9HTGLShR/redbull-tropical.jpg", RedBullCategory),
                        new Product("Red Bull Apricot", 2.00, 50, "Red Bull with apricot and strawberry flavoring", "https://i.ibb.co/zhTLmCdb/redbull-apricot.jpg", RedBullCategory),
                        new Product("Red Bull Cactus", 2.00, 50, "Red Bull with cactus flavoring", "https://i.ibb.co/Pz9gCpN6/redbull-cactus.jpg", RedBullCategory),
                        new Product("Red Bull Juneberry", 2.00, 50, "Red Bull with juneberry flavoring", "https://i.ibb.co/GvXnDHrR/redbull-juneberry.jpg", RedBullCategory),
                        new Product("Monster Zero", 3.00, 100, "Monster without sugar", "https://i.ibb.co/SwHWkKFv/monster-zero.jpg", MonsterCategory),
                        new Product("Monster Mango", 3.00, 100, "Monster with mango juice flavoring", "https://i.ibb.co/6ck38wN9/monster-mango.jpg", MonsterCategory),
                        new Product("Monster Gold", 3.00, 100, "Monster with pineapple flavoring", "https://i.ibb.co/RG7LgzHh/monster-gold.jpg", MonsterCategory),
                new Product("Monster Juiced Apple", 3.00, 100, "Monster with apple flavoring", "https://i.ibb.co/WNHX6yqy/monster-badapple.jpg", MonsterCategory),
                new Product("Monster Full Throttle", 3.00, 100, "Monster collab with Lewis Hamilton", "https://i.ibb.co/wNLGc62G/monster-fullthrottle.jpg", MonsterCategory),
                new Product("Monster Punch", 3.00, 100, "Monster with fruit juice punch flavoring", "https://i.ibb.co/fVgsCbqW/monster-juicedpipelinepunch.jpg", MonsterCategory),
                new Product("Monster Peach", 3.00, 100, "Monster with peach flavoring", "https://i.ibb.co/7PFBkSV/monster-ultra-peachykeen.jpg", MonsterCategory),
                new Product("Monster Ruby Red", 3.00, 100, "Monster with wild berry flavoring", "https://i.ibb.co/qFnWjXrZ/monster-ultrafantasyrubyred.jpg", MonsterCategory),
                new Product("Monster Strawberry Dreams", 3.00, 100, "Monster with strawberry flavoring", "https://i.ibb.co/MDjQ2r6p/monster-ultrastrawberrydreams.jpg", MonsterCategory),

        );

        for (Product product : blikjes) {
            productService.createProduct(product);
        }
    }
}