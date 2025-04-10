import jakanta.persisntence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Table(name = products)
public class ProductModel {
    @Id
    private Long id;
    private String name;
    private String description;
    private String imagePath;
    private number price;

    public ProductModel(Long id, String name, String description, String imagePath, number price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public number getPrice() {
        return price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setPrice(number price) {
        this.price = price;
    }
}