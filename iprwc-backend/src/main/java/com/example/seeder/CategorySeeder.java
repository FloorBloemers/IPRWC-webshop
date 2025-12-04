package com.example.seeder;

import com.example.models.Category;
import com.example.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
@Order(1)
public class CategorySeeder implements CommandLineRunner {

    private final CategoryService categoryService;

    @Override
    public void run(String... args) {
        seedCategories();
    }

    private void seedCategories() {
        if (categoryService.getCategoryByName("Red Bull").isEmpty()) {
            categoryService.createCategory(new Category("Red Bull", "Red Bull Energy"));
        }
        if (categoryService.getCategoryByName("Monster").isEmpty()) {
            categoryService.createCategory(new Category("Monster", "Monster Energy"));
        }
    }
}