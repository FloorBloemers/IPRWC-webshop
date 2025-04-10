import jakanta.persisntence.*;
import lombok.*;
import orh.hibernate.*;

@Entity
@NoArgsConstructor
@Table(name = "cart_items")
public class ShoppingCartItemModel {
    @Id
    private Long id;
    private ShoppingCartModel cart;
    private int quantity;

    public ShoppingCartItemModel(Long id, ShoppingCartModel cart, int quantity) {
        this.id = id;
        this.cart = cart;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShoppingCartModel getCart() {
        return cart;
    }

    public void setCart(ShoppingCartModel cart) {
        this.cart = cart;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}