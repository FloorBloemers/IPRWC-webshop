import { Component, OnInit } from '@angular/core';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit{

  constructor() {
  }

  ngOnInit() {
  }
}
