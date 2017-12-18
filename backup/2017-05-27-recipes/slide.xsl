<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:param name="message"></xsl:param>

<xsl:template match="catalog">
      <input id="recipes" type="hidden" onchange="update()"></input>
      <!-- <div id="left" onclick="toLeft()"></div> -->
      <xsl:element name="div">
	    <xsl:attribute name="id">scroll-area</xsl:attribute>
	    <xsl:attribute name="default"><xsl:value-of select="default-recipe"/></xsl:attribute>
	    <xsl:element name="div">
		  <xsl:attribute name="id">scroll-data</xsl:attribute>
		  <xsl:variable name="datawidth">
			   <xsl:choose>
			      <xsl:when test="count(recipes/recipe)&lt;'7'">980</xsl:when>
			      <xsl:otherwise>
				 <xsl:value-of select="10 + 150 * count(recipes/recipe) "/>
			      </xsl:otherwise>
			   </xsl:choose>
		  </xsl:variable>
		  <xsl:attribute name="style">width: <xsl:value-of select="$datawidth"/>px</xsl:attribute>
		  <xsl:for-each select="recipes/recipe">
			<xsl:element name="span">
			      <xsl:attribute name="id">
				    <xsl:value-of select="id"/>
			      </xsl:attribute>
			      <xsl:attribute name="class">left object</xsl:attribute>
			      <xsl:attribute name="onclick">update("<xsl:value-of select="id"/>")</xsl:attribute>
			      <xsl:attribute name="onmousedown">return false;</xsl:attribute>
			      <xsl:attribute name="style">left: <xsl:value-of select="150 * position() - 140"/>px</xsl:attribute>
			      <xsl:element name="img">
				    <xsl:attribute name="src">
					  <xsl:value-of select="image"/>
				    </xsl:attribute>
				    <xsl:attribute name="alt">
					  <xsl:value-of select="name"/>
				    </xsl:attribute>
			      </xsl:element>
			      <p class="object"><xsl:value-of select="name"/></p>
			</xsl:element>
		  </xsl:for-each>
	    </xsl:element>
      </xsl:element>
      <!-- <div id="right" onclick="toRight()"></div> -->
</xsl:template>

<xsl:template match="catalog/store"></xsl:template>

</xsl:stylesheet>