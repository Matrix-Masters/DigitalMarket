import com.google.gson.annotations.SerializedName

data class UserResponse(
    @SerializedName("user")
    val user: UserRes,
    @SerializedName("token")
    val token: String
)

data class UserRes(
    val id: Int,
    val email: String,
    @SerializedName("welcome_field")
    val welcomeField: String?,
    val status: Int,
    @SerializedName("password_token")
    val passwordToken: String?,
    @SerializedName("updated_at")
    val updatedAt: String,
    @SerializedName("created_at")
    val createdAt: String,
    val role: String,
    val contract: String?,
    @SerializedName("email_verified_at")
    val emailVerifiedAt: String,
    @SerializedName("keycloak_id")
    val keycloakId: String?,
    val password: String,
    @SerializedName("firstName")
    val firstName: String,
    @SerializedName("lastName")
    val lastName: String,
    @SerializedName("numTlf")
    val numTlf: String,
    val cin: String?,
    val sexe: String,
    val photo: String?,
    @SerializedName("photoCin")
    val photoCin: String?
)
