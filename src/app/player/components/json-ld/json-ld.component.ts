import { Component, Input, OnChanges, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-ld-component',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class JsonLDComponent implements OnChanges {
  @Input() playerData: any;

  constructor(private renderer: Renderer2) {};

  ngOnChanges(): void {
    if (!this.playerData)
      return;

    const prev = document.head.querySelector('script[type="application/ld+json"]');
    if (prev) prev.remove();

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';

    const jsonLD = {
        '@context': 'https://schema.org/',
        '@id': `https://franco-castiglia.github.io/football-players-data/rdf_players/${this.getSlug(this.playerData.name)}.ttl`, // ojo aca el slug tiene que ser el mismo nombre que tiene el archivo ttl, hay q revisar esto
        '@type': ['Person', 'Athlete'],
        'name': this.playerData.name,
        'birthDate': this.playerData.birth,
        'nationality': this.playerData.nationality,
        'height': this.playerData.height,
        'weight': this.playerData.weight,
        'memberOf': this.playerData.club,
        'description': this.playerData.description,
        'image': this.playerData.photo,
        'sameAs': this.playerData.wikiData
    };

    script.text = JSON.stringify(jsonLD, null, 2);
    this.renderer.appendChild(document.head, script);
  }

  private getSlug(name: string) {
    return name
        .normalize("NFD")                  // quita tildes
        .replace(/[\u0300-\u036f]/g, "")   // limpia diacriticos
        .replace(/\s+/g, "_")              // reemplaza espacios por _
        .replace(/[^a-zA-Z0-9_]/g, "");    // borra cualquier carácter raro
  }
}
