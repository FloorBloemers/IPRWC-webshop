import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Table(name = "cart")
public class ShoppingCartModel {
    @Id
    private long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referenceColumnName = "id")
    private UserModel user;

    public ShoppingCartModel(Long id, UserModel user) {
        this.id = id;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}