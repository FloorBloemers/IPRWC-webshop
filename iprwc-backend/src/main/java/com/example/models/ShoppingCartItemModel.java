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
    private ProductModel product;
    private int quantity;

    public ShoppingCartItemModel(Long id, ShoppingCartModel cart, ProductModel product, int quantity) {
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
    }

    @Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JdbcTypeCode(SqlTypes.JSON)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    public ShoppingCartModel getCart() {
        return cart;
    }

    public void setCart(ShoppingCartModel cart) {
        this.cart = cart;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}