import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasserProductComponent } from './AdminCompoenent/classer-product/classer-product.component';
import { GererProduitComponent } from './AdminCompoenent/GererProduitComponents/gerer-produit/gerer-produit.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './AdminCompoenent/dashboard/dashboard.component';
import { CategoryListComponent } from './AdminCompoenent/GererCategory/category-list/category-list.component';
import { GererCommandeComponent } from './AdminCompoenent/gerer-commande/gerer-commande.component';
import { GererSupplierComponent } from './AdminCompoenent/GererSuppliersComponents/gerer-supplier/gerer-supplier.component';
import { LocationCommandeComponent } from './ClientComponent/location-commande/location-commande.component';
import { AccueilClientComponent } from './AccueilClient/accueil-client/accueil-client.component';
import { AccueilCartComponent } from './AccueilClient/accueil-cart/accueil-cart.component';
import { NotFoundComponentComponent } from './notfound/not-found-component/not-found-component.component';
import { CommandeComponent } from './ClientComponent/commande/commande.component';
import { FavoriteListClientComponent } from './AccueilClient/favorite-list-client/favorite-list-client.component';
import { LIstEmpolyersComponent } from './superAdminComponents/Employers/list-empolyers/list-empolyers.component';
import { AddEmployerComponent } from './superAdminComponents/Employers/add-employer/add-employer.component';
import { CommandeClientComponent } from './ClientComponent/commande-client/commande-client.component';
import { FournisseurInterfaceComponent } from './Fournissuer/fournisseur-interface/fournisseur-interface.component';
import { FournisseurDashboardComponent } from './Fournissuer/fournisseur-dashboard/fournisseur-dashboard.component';
import { AddProductComponent } from './Fournissuer/add-product/add-product.component';
import { ListCommandesComponent } from './ClientComponent/list-commandes/list-commandes.component';
import { ListProductsFournisseurComponent } from './Fournissuer/list-products-fournisseur/list-products-fournisseur.component';
import { ContractComponent } from './Fournissuer/contract/contract.component';
import { EditProfileComponent } from './EditProfile/edit-profile/edit-profile.component';
import { StatsComponent } from './Fournissuer/statistiques/stats.component';
import { StockAdminComponent } from './AdminCompoenent/stock-admin/stock-admin.component';
import { ImageProductComponent } from './AdminCompoenent/image-product/image-product.component';
import { IsAuthGuard } from './guard/is-auth.guard';
import { DetailsProductComponent } from './AccueilClient/details-product/details-product.component';
import { guardRoleGuard } from './guard/guard-role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
     path: 'classer',
     component: ClasserProductComponent,
     canActivate: [IsAuthGuard, guardRoleGuard],
     data: {
        role: ['AdminOrganisator','SuperAdmin']
     }
  },
  {
     path: 'dash',
     component: DashboardComponent,
     canActivate: [IsAuthGuard, guardRoleGuard],
     data: {
        role: ['SuperAdmin']
     }
  },
  {
      path: 'gererProduit',
      component: GererProduitComponent,
      canActivate: [IsAuthGuard, guardRoleGuard],
      data: {
         role: ['AdminTechnique','SuperAdmin']
      }
   },
   { 
     path: 'gererSupplier',
     component: GererSupplierComponent, 
     canActivate: [IsAuthGuard, guardRoleGuard],
     data: {
        role: ['AdminTechnique','SuperAdmin']
     }
  },
  { 
      path: 'listCategory', 
      component: CategoryListComponent,
      canActivate: [IsAuthGuard, guardRoleGuard],
      data: {
         role: ['AdminOrganisator','SuperAdmin']
      }
  },
  {
     path: 'Commandes',
     component: GererCommandeComponent,
     canActivate: [IsAuthGuard, guardRoleGuard],
     data: {
        role: ['AdminCommande','SuperAdmin']
     }
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'Commandes_Taken', component: LocationCommandeComponent, canActivate: [IsAuthGuard] },
  { path: 'categories/:id', component: AccueilClientComponent },
  { path: 'cart', component: AccueilCartComponent },
  { path: 'Commande', component: CommandeComponent, canActivate: [IsAuthGuard] },
  { path: 'FavoriteList', component: FavoriteListClientComponent, canActivate: [IsAuthGuard] },
  { path: 'gererEmployers', component: LIstEmpolyersComponent, canActivate: [IsAuthGuard] },
  { path: 'addEmploye', component: AddEmployerComponent, canActivate: [IsAuthGuard] },
  { path: 'CommandeLocation', component: CommandeClientComponent, canActivate: [IsAuthGuard] },
  {
     path: 'fournisseur',
     component: FournisseurInterfaceComponent,
     canActivate: [IsAuthGuard, guardRoleGuard],
     data: {
        role: ['Supplier']
     }
  },
  { path: 'fournisseurDash', component: FournisseurDashboardComponent, canActivate: [IsAuthGuard] },
  { path: 'addProductFournisseur', component: AddProductComponent, canActivate: [IsAuthGuard] },
  { path: 'listeCommandesClient', component: ListCommandesComponent, canActivate: [IsAuthGuard] },
  { path: 'ListProductsFournisseur', component: ListProductsFournisseurComponent, canActivate: [IsAuthGuard] },
  { path: 'ContractComponent', component: ContractComponent, canActivate: [IsAuthGuard] },
  { path: 'editProfile', component: EditProfileComponent, canActivate: [IsAuthGuard] },
  {
      path: 'stockadmin',
      component: StockAdminComponent,
      canActivate: [IsAuthGuard, guardRoleGuard],
      data: {
            role: ['AdminStock','SuperAdmin']
      } 
   },
  { 
      path: 'ImageProduct/:id',
      component: ImageProductComponent,
      canActivate: [IsAuthGuard, guardRoleGuard],
      data: {
            role: ['AdminStock','SuperAdmin']
      } 
   },
  { path: 'DetailProduct/:id', component: DetailsProductComponent },
  { 
      path: 'statsFournisseur/:id',
      component: StatsComponent,
      canActivate: [IsAuthGuard, guardRoleGuard],
      data: {
         role: ['Supplier']
      }  
  },
  { path: '**', component: NotFoundComponentComponent }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }

