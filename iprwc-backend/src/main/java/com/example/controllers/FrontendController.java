package com.example.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {"/home", "/products", "/"})
    public String index() {
        return "forward:/index.html"; // serve Angular index.html
    }
}
